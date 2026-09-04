import { FloodType, SeverityType } from '../types/flood';

export interface AIAssessmentResult {
  suggestedSeverity: SeverityType;
  suggestedFloodType: FloodType;
  urgencyLevel: 'Emergency Rescue' | 'Urgent Attention' | 'Elevated Monitoring' | 'Routine Advisory';
  confidenceScore: number;
  reasoning: string;
  detectedKeywords: string[];
}

export const analyzeFloodDescriptionWithAI = (description: string, waterLevel?: number): AIAssessmentResult => {
  const text = description.toLowerCase();
  const detectedKeywords: string[] = [];

  // Keywords dictionary
  const criticalKeywords = ['trapped', 'roof', 'submerged', 'evacuate', 'rescue', 'boat', 'swept away', 'lives at risk', 'danger', 'spill gates', 'over 4 feet', 'over 5 feet'];
  const highKeywords = ['overflow', 'impassable', 'blocked', 'bridge', 'inundated', 'rising fast', 'elderly', 'hospital', 'highway'];
  const moderateKeywords = ['knee depth', 'waterlogged', 'stagnant', 'paddy field', 'seepage', 'slow traffic', 'rainwater'];
  const lowKeywords = ['subsiding', 'receding', 'drainage clearing', 'minor puddle', 'shallow'];

  let criticalScore = 0;
  let highScore = 0;
  let moderateScore = 0;
  let lowScore = 0;

  criticalKeywords.forEach(k => {
    if (text.includes(k)) {
      criticalScore += 3;
      detectedKeywords.push(k);
    }
  });

  highKeywords.forEach(k => {
    if (text.includes(k)) {
      highScore += 2;
      detectedKeywords.push(k);
    }
  });

  moderateKeywords.forEach(k => {
    if (text.includes(k)) {
      moderateScore += 1;
      detectedKeywords.push(k);
    }
  });

  lowKeywords.forEach(k => {
    if (text.includes(k)) {
      lowScore += 1;
      detectedKeywords.push(k);
    }
  });

  // Factor in water level if provided
  if (waterLevel !== undefined) {
    if (waterLevel >= 4.0) criticalScore += 4;
    else if (waterLevel >= 2.5) highScore += 3;
    else if (waterLevel >= 1.0) moderateScore += 2;
  }

  // Determine severity
  let suggestedSeverity: SeverityType = 'Moderate';
  let urgencyLevel: AIAssessmentResult['urgencyLevel'] = 'Elevated Monitoring';
  let reasoning = 'Standard community rainfall alert.';

  if (criticalScore >= 3 || (waterLevel && waterLevel >= 4)) {
    suggestedSeverity = 'Critical';
    urgencyLevel = 'Emergency Rescue';
    reasoning = 'High probability of life or property hazard. Mentions severe conditions requiring rapid response.';
  } else if (highScore >= 2 || (waterLevel && waterLevel >= 2.5)) {
    suggestedSeverity = 'High';
    urgencyLevel = 'Urgent Attention';
    reasoning = 'Significant inundation impacting main access roads or critical infrastructure.';
  } else if (lowScore > 2 || text.includes('receding') || text.includes('resolved')) {
    suggestedSeverity = 'Low';
    urgencyLevel = 'Routine Advisory';
    reasoning = 'Localized shallow water or receding levels.';
  } else {
    suggestedSeverity = 'Moderate';
    urgencyLevel = 'Elevated Monitoring';
    reasoning = 'Moderate localized waterlogging requiring situational awareness.';
  }

  // Determine flood type
  let suggestedFloodType: FloodType = 'Heavy Rain Flooding';
  if (text.includes('kelani') || text.includes('kalu') || text.includes('gin') || text.includes('nilwala') || text.includes('mahaweli') || text.includes('river') || text.includes('ganga') || text.includes('oya') || text.includes('bund')) {
    suggestedFloodType = 'River Overflow';
  } else if (text.includes('flash') || text.includes('torrential') || text.includes('sudden') || text.includes('culvert')) {
    suggestedFloodType = 'Flash Flood';
  } else if (text.includes('landslide') || text.includes('slope') || text.includes('mountain') || text.includes('cutting failure')) {
    suggestedFloodType = 'Landslide-related Flooding';
  } else if (text.includes('town') || text.includes('street') || text.includes('drain') || text.includes('traffic') || text.includes('city')) {
    suggestedFloodType = 'Urban Flood';
  } else if (text.includes('coast') || text.includes('sea') || text.includes('lagoon') || text.includes('sandbar') || text.includes('estuary')) {
    suggestedFloodType = 'Coastal Surge';
  }

  const confidenceScore = Math.min(95, 60 + detectedKeywords.length * 8);

  return {
    suggestedSeverity,
    suggestedFloodType,
    urgencyLevel,
    confidenceScore,
    reasoning,
    detectedKeywords
  };
};
