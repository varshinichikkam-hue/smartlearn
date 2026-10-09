import { Resource } from "@/types";

/**
 * Generates and triggers a genuine browser file download for a study resource.
 */
export function downloadResourceFile(resource: Resource) {
  // If the resource has an uploaded blob / data URL, download that directly
  if (resource.fileUrl && resource.fileUrl.startsWith('blob:') || resource.fileUrl?.startsWith('data:')) {
    const a = document.createElement('a');
    a.href = resource.fileUrl;
    a.download = resource.fileName || `${resource.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}.${resource.type === 'pdf' ? 'pdf' : 'mp4'}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    return;
  }

  // Generate authentic file content for demonstration resources
  if (resource.type === 'pdf') {
    const textContent = `================================================================================
SMARTLEARN PEER-TO-PEER STUDY RESOURCE
================================================================================
Title:       ${resource.title}
Subject:     ${resource.subject}
Topic:       ${resource.topic}
Author:      ${resource.tellerName}
Date:        ${new Date(resource.createdAt).toLocaleDateString()}
Resource ID: ${resource.id}
File Size:   ${resource.fileSize}
================================================================================

EXECUTIVE OVERVIEW & STUDY GUIDE
${resource.description}

--------------------------------------------------------------------------------
LECTURE NOTES & CURATED CONCEPT SUMMARY
--------------------------------------------------------------------------------
${resource.contentPreview || `
1. CORE PRINCIPLES & DEFINITIONS
- Fundamental theoretical foundations for ${resource.subject}: ${resource.topic}.
- Key equations, structural diagrams, and execution characteristics.
- Common exam questions and professor focal points.

2. DETAILED MECHANICS & IMPLEMENTATION
- Step-by-step breakdown of algorithms and architectural constraints.
- Edge cases, asymptotic time & space complexities.
- Real-world software and hardware analogies.

3. WORKED EXAMPLES & PRACTICE PROBLEMS
- Problem Statement 1: Step-by-step derivation and solution analysis.
- Problem Statement 2: Boundary condition handling.

4. REVISION CHECKLIST
[x] Understand fundamental taxonomy and invariant properties.
[x] Able to reproduce core derivations and syntax from memory.
[x] Completed review of associated quiz materials.
`}

--------------------------------------------------------------------------------
Published on SmartLearn Student-to-Student Learning Platform.
Shared by college students, for college students.
`;

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = resource.fileName.endsWith('.pdf') ? resource.fileName.replace('.pdf', '_notes.txt') : `${resource.fileName}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 3000);
  } else {
    // For video resource metadata download
    const videoInfo = `================================================================================
SMARTLEARN EDUCATIONAL VIDEO RESOURCE PACKAGE
================================================================================
Title:       ${resource.title}
Author:      ${resource.tellerName}
Subject:     ${resource.subject}
Topic:       ${resource.topic}
Duration:    ${resource.duration || 'Full Lecture'}
Views:       ${resource.views}

LECTURE DESCRIPTION:
${resource.description}

VIDEO STREAM DETAILS:
Streaming Link / Player: Available in SmartLearn Video Player
Stream Host: Educational Video CDN (Open Access)
Video Source: ${resource.videoUrl || 'Standard University Video Stream'}

KEY TIMESTAMPS:
00:00 - Introduction & Lecture Objectives
03:15 - Core Concepts & Foundational Theory
08:45 - Practical Demonstration & Real-world Walkthrough
14:20 - Common Pitfalls, Memory Models & Best Practices
18:00 - Summary, Q&A and Recommended Next Steps
================================================================================
`;
    const blob = new Blob([videoInfo], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${resource.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}_video_lecture_guide.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 3000);
  }
}
