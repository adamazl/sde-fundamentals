import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { DiagramRenderer } from "./DiagramRenderer";
import type { DiagramKind } from "./types";

const allKinds: DiagramKind[] = [
  "init",
  "staging",
  "commit",
  "branch",
  "checkout",
  "mergeFastForward",
  "mergeThreeWay",
  "remoteClone",
  "remotePush",
  "remotePull",
  "rebase",
  "stash",
  "unitTest",
  "testPyramid",
  "debugCycle",
  "tdCycle",
  "ciFlow",
  "cdFlow",
  "pipelineStages",
  "environmentPromotion",
  "reviewValue",
  "prWorkflow",
  "feedbackStructure",
  "feedbackResponse",
  "patternIntro",
  "singletonPattern",
  "factoryPattern",
  "observerPattern",
  "dbQueryFlow",
  "sqlVsNosql",
  "keysRelationship",
  "indexLookup",
];

describe("DiagramRenderer", () => {
  it.each(allKinds)("renders an svg for the %s diagram kind", (kind) => {
    const { container } = render(<DiagramRenderer kind={kind} />);
    expect(container.querySelector("svg")).not.toBeNull();
  });
});
