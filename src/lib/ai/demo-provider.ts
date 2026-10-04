import {
  CivicAIProvider,
  ImpactSubmission,
  ComplaintSubmission,
  ResolutionInput,
  AssistantAnswer,
  DistrictContext,
} from './types';
import {
  ImpactVerification,
  ComplaintAnalysis,
  ResolutionVerification,
} from '../../types';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export class DemoCivicAIProvider implements CivicAIProvider {
  readonly isLive = false;

  /**
   * Simulated Impact Verification with 6 sequential steps
   */
  async verifyImpact(
    input: ImpactSubmission,
    onProgress?: (stepIndex: number, stepLabel: string) => void
  ): Promise<ImpactVerification> {
    const steps = [
      'Image relevance verification',
      'Scene visual analysis & participant estimation',
      'Duplicate and recycled evidence detection',
      'Manipulation & metadata authenticity check',
      'Location and geographic consistency verification',
      'Civic activity pattern & category validation',
    ];

    for (let i = 0; i < steps.length; i++) {
      if (onProgress) {
        onProgress(i, steps[i]);
      }
      await sleep(400); // realistic sequential simulation
    }

    const isDuplicate = input.forceDuplicateWarning || 
      input.evidence.some(e => e.name.toLowerCase().includes('duplicate') || e.name.toLowerCase().includes('reuse'));

    const evText = input.evidence.map(e => `${e.name} ${e.url}`).join(' ').toLowerCase();
    const titleLower = input.title.toLowerCase();
    const descLower = input.description.toLowerCase();

    // Check for unrelated objects (car, selfie, room, indoor, animal, dog, cat, desk, vehicle)
    const isUnrelatedObjectOrMismatch =
      evText.includes('car') ||
      evText.includes('vehicle') ||
      evText.includes('selfie') ||
      evText.includes('room') ||
      evText.includes('indoor') ||
      evText.includes('bedroom') ||
      evText.includes('cat') ||
      evText.includes('dog') ||
      evText.includes('animal') ||
      evText.includes('desk') ||
      evText.includes('unrelated') ||
      evText.includes('mismatch') ||
      titleLower.includes('car') ||
      titleLower.includes('selfie') ||
      descLower.includes('car') ||
      descLower.includes('selfie') ||
      (input.category === 'Environment' && (evText.includes('phone') || evText.includes('computer')));

    if (isUnrelatedObjectOrMismatch) {
      const summary = 'Visual evidence mismatch detected.';
      const reasoning = 'The uploaded photo shows an unrelated object (e.g. personal vehicle or indoor space), which does not contain visual proof supporting the selected civic category. Uploaded image does not provide visual proof matching the reported action or category.';

      return {
        id: `ver-${Date.now()}`,
        subjectType: 'activity',
        subjectId: `act-${Date.now()}`,
        confidence: 15,
        evidenceConfidence: 15,
        evidenceQuality: 15,
        estimatedParticipants: 0,
        impactLevel: 'Invalid',
        impactTier: 'Invalid',
        civicImpactScore: 10,
        summary,
        reasoning,
        checks: [
          {
            key: 'visual_match',
            label: 'Visual Evidence Cross-Check (Strict Rule)',
            status: 'fail',
            detail: 'Uploaded image does not provide visual proof matching the reported action or category.',
          },
          {
            key: 'category_relevance',
            label: 'Category & Description Relevance',
            status: 'warn',
            detail: 'Description claims lack verifiable visual proof in the submitted image.',
          },
          {
            key: 'duplicate',
            label: 'Duplicate evidence detection',
            status: 'pass',
            detail: 'No duplicate image pattern detected across district archives.',
          },
          {
            key: 'location',
            label: 'Location evidence confirmation',
            status: 'pass',
            detail: `Geographic backdrop marked for ${input.locationName || 'Lower Chitral'}.`,
          },
          {
            key: 'metadata',
            label: 'Timestamp & EXIF metadata',
            status: 'pass',
            detail: 'EXIF payload matches reported submission timeframe.',
          },
        ],
        explanation: [
          summary,
          reasoning,
          'Score allocated between 0 and 20 (10 points awarded) per CivicPulse strict scoring rules.',
        ],
        warningNote: 'Uploaded image does not provide visual proof matching the reported action or category.',
        isDemo: true,
      };
    }

    if (isDuplicate) {
      const summary = 'Potential duplicate evidence detected across district archives.';
      const reasoning = 'Visual patterns match an archive entry from August 2026. Evidence does not appear to be fresh ground-level documentation.';

      return {
        id: `ver-${Date.now()}`,
        subjectType: 'activity',
        subjectId: `act-${Date.now()}`,
        confidence: 25,
        evidenceConfidence: 25,
        evidenceQuality: 25,
        estimatedParticipants: 12,
        impactLevel: 'Low',
        impactTier: 'Low',
        civicImpactScore: 15,
        summary,
        reasoning,
        checks: [
          { key: 'visual_match', label: 'Visual Evidence Match (Strict Rule)', status: 'warn', detail: 'Visual objects correspond to community cleanup efforts, but similarity to past archives was detected.' },
          { key: 'category_relevance', label: 'Category & Description Relevance', status: 'pass', detail: 'Description corresponds with general civic category.' },
          { key: 'duplicate', label: 'Duplicate evidence detection', status: 'fail', detail: 'Similar evidence detected: Visual patterns match an archive entry from August 2026. Further review recommended.' },
          { key: 'location', label: 'Location evidence confirmation', status: 'pass', detail: 'Geographic backdrop matches Drosh municipal region.' },
          { key: 'metadata', label: 'Timestamp & EXIF metadata', status: 'pass', detail: 'EXIF payload matches reported submission timeframe.' },
        ],
        explanation: [
          summary,
          reasoning,
          'Civic Points penalized to 15 points pending manual administration review.',
        ],
        warningNote: 'Similar evidence detected: An image appears similar to evidence submitted in another activity. Additional review is recommended.',
        isDemo: true,
      };
    }

    // Standard Hero Journey A response: Verified genuine civic work
    const summary = 'High evidence clarity and authentic community engagement in Drosh Bazaar.';
    const reasoning = 'Photographic evidence clearly displays collective waste management, volunteer teams bagging roadside trash, and public street sanitation in Drosh Bazaar matching the Environment category.';

    return {
      id: `ver-${Date.now()}`,
      subjectType: 'activity',
      subjectId: `act-${Date.now()}`,
      confidence: 92,
      evidenceConfidence: 92,
      evidenceQuality: 92,
      estimatedParticipants: 25,
      impactLevel: 'High',
      impactTier: 'High',
      civicImpactScore: 75,
      summary,
      reasoning,
      checks: [
        { key: 'visual_match', label: 'Visual Evidence Match (Strict Rule)', status: 'pass', detail: 'Visual evidence depicts collective waste management & public street sanitation.' },
        { key: 'category_relevance', label: 'Category & Description Relevance', status: 'pass', detail: 'Description directly corresponds with visible ground-level community effort.' },
        { key: 'duplicate', label: 'No duplicate evidence detected', status: 'pass', detail: 'Hash analysis matched 0 prior submissions across the district repository.' },
        { key: 'location', label: 'Location evidence confirmed', status: 'pass', detail: 'Structural landmarks confirm Drosh Bazaar commercial perimeter.' },
        { key: 'metadata', label: 'Timestamp & EXIF data verified', status: 'pass', detail: 'Camera metadata matches reported activity schedule.' },
      ],
      explanation: [
        summary,
        reasoning,
        '25 volunteers confirmed through multi-person spatial bounding boxes.',
        'Community environmental benefit approved (+75 Civic Points).',
      ],
      isDemo: true,
    };
  }

  /**
   * Simulated Complaint Analysis with smart categorization and severity detection
   */
  async analyzeComplaint(
    input: ComplaintSubmission,
    onProgress?: (stepIndex: number, stepLabel: string) => void
  ): Promise<ComplaintAnalysis> {
    const steps = [
      'Ingesting photographic evidence & metadata',
      'Object detection: hazard and asset inspection',
      'Assessing severity & public safety urgency',
      'Determining responsible municipal jurisdiction',
    ];

    for (let i = 0; i < steps.length; i++) {
      if (onProgress) {
        onProgress(i, steps[i]);
      }
      await sleep(350);
    }

    const titleLower = input.title.toLowerCase();
    const descLower = input.description.toLowerCase();

    let category = 'Infrastructure';
    let subcategory = 'Road Damage';
    let department = 'C&W Department';
    let departmentId = 'dept-cw';
    let severity: 'low' | 'medium' | 'high' | 'critical' = 'high';

    if (titleLower.includes('waste') || titleLower.includes('trash') || descLower.includes('garbage')) {
      category = 'Sanitation';
      subcategory = 'Solid Waste Accumulation';
      department = 'TMA (Tehsil Municipal Administration)';
      departmentId = 'dept-tma';
      severity = 'medium';
    } else if (titleLower.includes('water') || descLower.includes('pipeline') || descLower.includes('leak')) {
      category = 'Utilities';
      subcategory = 'Potable Water Pipeline Rupture';
      department = 'Public Health Engineering';
      departmentId = 'dept-phe';
      severity = 'high';
    } else if (titleLower.includes('electric') || descLower.includes('wire') || descLower.includes('transformer')) {
      category = 'Public Safety';
      subcategory = 'Exposed Electrical Hazard';
      department = 'PESCO / Power Authority';
      departmentId = 'dept-pesco';
      severity = 'critical';
    }

    return {
      id: `ai-comp-${Date.now()}`,
      category,
      subcategory,
      severity,
      confidence: 94,
      locationVerified: true,
      recommendedDepartmentId: departmentId,
      recommendedDepartmentName: department,
      isDemo: true,
      summary: `Automated analysis detected visible ${subcategory.toLowerCase()} along public corridor. Immediate routing recommended to ${department}.`,
    };
  }

  /**
   * Simulated Resolution Verification (Before / After Comparison)
   */
  async verifyResolution(
    input: ResolutionInput,
    onProgress?: (stepIndex: number, stepLabel: string) => void
  ): Promise<ResolutionVerification> {
    const steps = [
      'Aligning spatial perspective of Before and After evidence',
      'Surface change feature extraction & anomaly delta analysis',
      'Validating clearance of initial hazard or defect',
      'Generating confidence index and compliance attestation',
    ];

    for (let i = 0; i < steps.length; i++) {
      if (onProgress) {
        onProgress(i, steps[i]);
      }
      await sleep(400);
    }

    if (input.forceLowConfidence) {
      return {
        id: `res-ver-${Date.now()}`,
        confidence: 41,
        notes: 'Visual comparison detected partial obstruction remnants. Human supervisor manual inspection required before final signoff.',
        verifiedAt: new Date().toISOString(),
        visualDifferenceScore: 41,
        isDemo: true,
      };
    }

    return {
      id: `res-ver-${Date.now()}`,
      confidence: 87,
      notes: 'Visual comparison indicates substantial change between submitted before and after evidence. Roadway surface obstruction fully resolved and restored.',
      verifiedAt: new Date().toISOString(),
      visualDifferenceScore: 87,
      isDemo: true,
    };
  }

  /**
   * AI District Assistant answering real computed data questions
   */
  async answerDistrictQuestion(
    query: string,
    context: DistrictContext
  ): Promise<AssistantAnswer> {
    await sleep(400);
    const q = query.toLowerCase();

    if (q.includes('biggest problem') || q.includes('drosh') || q.includes('frequent')) {
      const topCat = context.topCategories[0] || { category: 'Infrastructure', count: 14 };
      const secondCat = context.topCategories[1] || { category: 'Sanitation', count: 9 };
      return {
        headline: `${topCat.category} and ${secondCat.category} represent ${Math.round(((topCat.count + secondCat.count) / Math.max(1, context.totalComplaints)) * 100)}% of reported issues in Drosh.`,
        explanation: `Analysis of active municipal complaints indicates concentrated roadway wear and solid waste overflow around commercial transit hubs. Active work orders have been expedited for Drosh Bazaar.`,
        tableData: context.topCategories.map(c => ({ label: c.category, value: `${c.count} complaints` })),
        basis: `Calculated from ${context.totalComplaints} live municipal complaint records across Drosh and Lower Chitral tehsils.`,
        followUpQuestions: [
          'Which department has the most pending complaints?',
          'What is the average resolution time in Drosh?',
          'Which areas show high citizen participation?',
        ],
        isDemo: true,
      };
    }

    if (q.includes('department') || q.includes('pending') || q.includes('workload')) {
      const highestDept = context.departmentBreakdown.reduce((max, d) => (d.pending > max.pending ? d : max), context.departmentBreakdown[0] || { department: 'C&W Department', pending: 8, resolved: 14 });
      return {
        headline: `${highestDept.department} carries the highest active pending caseload (${highestDept.pending} open issues).`,
        explanation: `Roadway resurfacing and culvert drainage maintenance account for majority of backlog due to recent monsoon runoff repairs. TMA follows closely with solid waste tasks.`,
        tableData: context.departmentBreakdown.map(d => ({ label: d.department, value: `${d.pending} Pending / ${d.resolved} Resolved` })),
        basis: `Aggregated from Department Work Orders in Lower Chitral District as of current reporting cycle.`,
        followUpQuestions: [
          'Show me emergency reports pending review',
          'What are the biggest problems in Drosh this month?',
          'How many complaints were resolved this week?',
        ],
        isDemo: true,
      };
    }

    if (q.includes('participation') || q.includes('volunteer') || q.includes('low') || q.includes('builder')) {
      return {
        headline: `Drosh Central leads in volunteer mobilization; Ayun and Shishi Koh have lower documented participation.`,
        explanation: `While Drosh Bazaar has 25+ regular community volunteers and 87 participants in recent tree plantations, peripheral union councils require targeted outreach campaigns and mobile civic kiosks.`,
        tableData: [
          { label: 'Drosh Central', value: 'High (840+ verified volunteer hours)' },
          { label: 'Chitral Town', value: 'High (620+ volunteer hours)' },
          { label: 'Ayun Valley', value: 'Moderate (180 volunteer hours)' },
          { label: 'Shishi Koh', value: 'Low (65 volunteer hours)' },
        ],
        basis: `Derived from 8,294 district verified activity entries and volunteer attendance records.`,
        followUpQuestions: [
          'What upcoming volunteer campaigns are planned?',
          'What are the biggest problems in Drosh this month?',
          'Show active organizations in Lower Chitral',
        ],
        isDemo: true,
      };
    }

    // Default fallback
    return {
      headline: `District overview shows ${context.resolvedComplaints} issues resolved out of ${context.totalComplaints} total reported.`,
      explanation: `Overall district resolution efficiency is currently at ${Math.round((context.resolvedComplaints / Math.max(1, context.totalComplaints)) * 100)}%, with an average response time of 4.2 days. ${context.highPriorityCount} urgent cases require priority dispatch.`,
      tableData: [
        { label: 'Total Reported', value: context.totalComplaints },
        { label: 'Resolved to Date', value: context.resolvedComplaints },
        { label: 'Currently Pending', value: context.pendingComplaints },
        { label: 'High / Critical Priority', value: context.highPriorityCount },
      ],
      basis: `Real-time database query across Lower Chitral Municipal Administration records.`,
      followUpQuestions: [
        'What are the biggest problems in Drosh this month?',
        'Which department has the most pending complaints?',
        'Which areas have low citizen participation?',
      ],
      isDemo: true,
    };
  }
}

export const demoAiProvider = new DemoCivicAIProvider();
