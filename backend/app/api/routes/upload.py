from fastapi import APIRouter, UploadFile, File, HTTPException
import json

from app.services.ai_explainer import generate_ai_summary
from app.services.analyzer import analyze_policy
from app.services.knowledge_service import KnowledgeService
from app.services.parser import parse_policy
from app.services.remediation import remediate_policy
from app.services.risk_score import calculate_risk
from app.models.analysis_response import AnalysisResponse

router = APIRouter()

knowledge_service = KnowledgeService()


@router.post(
    "/upload-policy",
    response_model=AnalysisResponse,
    summary="Analyze an AWS S3 Bucket Policy",
    description=(
        "Uploads an S3 bucket policy, analyzes it for security issues, "
        "calculates a risk score, generates AI-powered explanations, "
        "and produces a remediated policy."
    ),
)
async def upload_policy(file: UploadFile = File(...)):

    if not file.filename.endswith(".json"):
        raise HTTPException(
            status_code=400,
            detail="Please upload a JSON file."
        )

    try:
        contents = await file.read()

        policy = parse_policy(contents)

        findings = analyze_policy(policy)

        # Attach knowledge to every finding
        for finding in findings:

            knowledge = knowledge_service.get_by_rule(finding.rule_id)

            if knowledge:
                finding.knowledge = knowledge

        # Generate remediated policy
        secure_policy, remediations = remediate_policy(
            policy,
            findings
        )
        remediated_rules = {
            remediation.rule_id
            for remediation in remediations
        }

        for finding in findings:
            if finding.rule_id in remediated_rules:
                finding.remediation_status = "Remediated"
            else:
                finding.remediation_status = "Not Remediated"
        risk = calculate_risk(findings)
        risk_score = risk["risk_score"]
        risk_level = risk["risk_level"]

        summary = generate_ai_summary(
            findings,
            risk_score,
            risk_level
        )

        return AnalysisResponse(
            message="Policy analyzed successfully",
            policy=policy,
            secure_policy=secure_policy,
            risk_score=risk_score,
            risk_level=risk_level,
            summary=summary,
            findings=findings,
            remediations=remediations,
        )

    except json.JSONDecodeError:
        raise HTTPException(
            status_code=400,
            detail="Invalid JSON file."
        )

    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )