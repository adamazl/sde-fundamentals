import { BoxFlow, CommitGraph } from "./primitives";
import type { DiagramKind } from "./types";

export function DiagramRenderer({ kind }: { kind: DiagramKind }) {
  switch (kind) {
    case "init":
      return <BoxFlow boxes={[{ label: "Folder", caption: "no git" }, { label: ".git/", caption: "git init" }]} />;
    case "staging":
      return (
        <BoxFlow
          boxes={[
            { label: "Working Dir", caption: "edit files" },
            { label: "Staging Area", caption: "git add" },
            { label: "Repository", caption: "git commit" },
          ]}
        />
      );
    case "commit":
      return (
        <CommitGraph
          nodes={[
            { id: "a", x: 60, y: 80, label: "A" },
            { id: "b", x: 140, y: 80, label: "B" },
            { id: "c", x: 220, y: 80, label: "C", highlight: true },
          ]}
          edges={[{ from: "a", to: "b" }, { from: "b", to: "c" }]}
          refs={[{ nodeId: "c", text: "HEAD" }]}
        />
      );
    case "branch":
      return (
        <CommitGraph
          nodes={[
            { id: "a", x: 60, y: 80, label: "A" },
            { id: "b", x: 140, y: 80, label: "B" },
            { id: "f", x: 220, y: 40, label: "F", highlight: true },
          ]}
          edges={[{ from: "a", to: "b" }, { from: "b", to: "f" }]}
          refs={[{ nodeId: "b", text: "main" }, { nodeId: "f", text: "feature" }]}
        />
      );
    case "checkout":
      return (
        <CommitGraph
          nodes={[
            { id: "a", x: 60, y: 80, label: "A" },
            { id: "b", x: 140, y: 80, label: "B", highlight: true },
            { id: "f", x: 220, y: 40, label: "F" },
          ]}
          edges={[{ from: "a", to: "b" }, { from: "b", to: "f" }]}
          refs={[{ nodeId: "b", text: "HEAD -> main" }, { nodeId: "f", text: "feature" }]}
        />
      );
    case "mergeFastForward":
      return (
        <CommitGraph
          nodes={[
            { id: "a", x: 60, y: 80, label: "A" },
            { id: "b", x: 140, y: 80, label: "B" },
            { id: "f", x: 220, y: 80, label: "F", highlight: true },
          ]}
          edges={[{ from: "a", to: "b" }, { from: "b", to: "f" }]}
          refs={[{ nodeId: "f", text: "main (moved)" }]}
        />
      );
    case "mergeThreeWay":
      return (
        <CommitGraph
          nodes={[
            { id: "a", x: 60, y: 80, label: "A" },
            { id: "b", x: 130, y: 50, label: "B" },
            { id: "f", x: 130, y: 110, label: "F" },
            { id: "m", x: 220, y: 80, label: "M", highlight: true },
          ]}
          edges={[
            { from: "a", to: "b" },
            { from: "a", to: "f" },
            { from: "b", to: "m" },
            { from: "f", to: "m" },
          ]}
          refs={[{ nodeId: "m", text: "main" }]}
        />
      );
    case "remoteClone":
      return <BoxFlow boxes={[{ label: "Remote Repo", caption: "GitHub" }, { label: "Local Repo", caption: "git clone" }]} />;
    case "remotePush":
      return <BoxFlow boxes={[{ label: "Local Repo", caption: "your commits" }, { label: "Remote Repo", caption: "git push" }]} />;
    case "remotePull":
      return <BoxFlow boxes={[{ label: "Remote Repo", caption: "teammates' commits" }, { label: "Local Repo", caption: "git pull" }]} />;
    case "rebase":
      return (
        <CommitGraph
          nodes={[
            { id: "a", x: 60, y: 80, label: "A" },
            { id: "b", x: 140, y: 80, label: "B" },
            { id: "f", x: 220, y: 80, label: "F'", highlight: true },
          ]}
          edges={[{ from: "a", to: "b" }, { from: "b", to: "f" }]}
          refs={[{ nodeId: "b", text: "main" }, { nodeId: "f", text: "feature" }]}
        />
      );
    case "stash":
      return (
        <BoxFlow
          boxes={[
            { label: "Working Dir", caption: "uncommitted changes" },
            { label: "Stash", caption: "git stash" },
          ]}
        />
      );
    case "unitTest":
      return (
        <BoxFlow
          boxes={[
            { label: "Function", caption: "code under test" },
            { label: "Unit Test", caption: "given input, expect X" },
            { label: "Pass / Fail", caption: "result" },
          ]}
        />
      );
    case "testPyramid":
      return (
        <BoxFlow
          boxes={[
            { label: "Unit", caption: "many, fast" },
            { label: "Integration", caption: "fewer" },
            { label: "End-to-End", caption: "few, slow" },
          ]}
        />
      );
    case "debugCycle":
      return (
        <BoxFlow
          boxes={[
            { label: "Reproduce", caption: "make it happen" },
            { label: "Isolate", caption: "narrow it down" },
            { label: "Fix", caption: "root cause" },
            { label: "Verify", caption: "confirm resolved" },
          ]}
        />
      );
    case "tdCycle":
      return (
        <BoxFlow
          boxes={[
            { label: "Red", caption: "write failing test" },
            { label: "Green", caption: "make it pass" },
            { label: "Refactor", caption: "clean up" },
          ]}
        />
      );
    case "ciFlow":
      return (
        <BoxFlow
          boxes={[
            { label: "Push Code", caption: "trigger" },
            { label: "Build", caption: "compile" },
            { label: "Run Tests", caption: "verify" },
          ]}
        />
      );
    case "cdFlow":
      return (
        <BoxFlow
          boxes={[
            { label: "Passing Build", caption: "from CI" },
            { label: "Deploy", caption: "automated" },
            { label: "Production", caption: "live" },
          ]}
        />
      );
    case "pipelineStages":
      return (
        <BoxFlow
          boxes={[
            { label: "Commit", caption: "trigger" },
            { label: "Build", caption: "stage 1" },
            { label: "Test", caption: "stage 2" },
            { label: "Deploy", caption: "stage 3" },
          ]}
        />
      );
    case "environmentPromotion":
      return (
        <BoxFlow
          boxes={[
            { label: "Dev", caption: "experiment" },
            { label: "Staging", caption: "final checks" },
            { label: "Production", caption: "real users" },
          ]}
        />
      );
    case "reviewValue":
      return (
        <BoxFlow
          boxes={[
            { label: "Code Change", caption: "one author" },
            { label: "Review", caption: "second pair of eyes" },
            { label: "Shared Context", caption: "whole team" },
          ]}
        />
      );
    case "prWorkflow":
      return (
        <BoxFlow
          boxes={[
            { label: "Open PR", caption: "propose change" },
            { label: "Review", caption: "comments" },
            { label: "Address Feedback", caption: "new commits" },
            { label: "Merge", caption: "done" },
          ]}
        />
      );
    case "feedbackStructure":
      return (
        <BoxFlow
          boxes={[
            { label: "Observation", caption: "what you noticed" },
            { label: "Why It Matters", caption: "impact" },
            { label: "Suggestion", caption: "a way forward" },
          ]}
        />
      );
    case "feedbackResponse":
      return (
        <BoxFlow
          boxes={[
            { label: "Read Comment", caption: "or ask to clarify" },
            { label: "Update Code", caption: "address it" },
            { label: "Re-request Review", caption: "signal readiness" },
          ]}
        />
      );
    case "patternIntro":
      return (
        <BoxFlow
          boxes={[
            { label: "Problem", caption: "recurring design issue" },
            { label: "Pattern", caption: "named solution shape" },
            { label: "Solution", caption: "adapted to your code" },
          ]}
        />
      );
    case "singletonPattern":
      return (
        <CommitGraph
          nodes={[
            { id: "c1", x: 60, y: 40, label: "Caller A" },
            { id: "c2", x: 60, y: 120, label: "Caller B" },
            { id: "c3", x: 130, y: 80, label: "Caller C" },
            { id: "s", x: 240, y: 80, label: "Instance", highlight: true },
          ]}
          edges={[
            { from: "c1", to: "s" },
            { from: "c2", to: "s" },
            { from: "c3", to: "s" },
          ]}
          refs={[{ nodeId: "s", text: "shared" }]}
        />
      );
    case "factoryPattern":
      return (
        <BoxFlow
          boxes={[
            { label: "Client", caption: "asks for a thing" },
            { label: "Factory", caption: "picks the class" },
            { label: "Product", caption: "created object" },
          ]}
        />
      );
    case "observerPattern":
      return (
        <CommitGraph
          nodes={[
            { id: "s", x: 80, y: 80, label: "Subject", highlight: true },
            { id: "o1", x: 220, y: 30, label: "Observer A" },
            { id: "o2", x: 220, y: 80, label: "Observer B" },
            { id: "o3", x: 220, y: 130, label: "Observer C" },
          ]}
          edges={[
            { from: "s", to: "o1" },
            { from: "s", to: "o2" },
            { from: "s", to: "o3" },
          ]}
          refs={[{ nodeId: "s", text: "notifies" }]}
        />
      );
    case "dbQueryFlow":
      return <BoxFlow boxes={[{ label: "App", caption: "sends a query" }, { label: "Database", caption: "returns results" }]} />;
    case "sqlVsNosql":
      return (
        <BoxFlow
          boxes={[
            { label: "SQL", caption: "tables & fixed schema" },
            { label: "NoSQL", caption: "documents & flexibility" },
          ]}
        />
      );
    case "keysRelationship":
      return (
        <CommitGraph
          nodes={[
            { id: "users", x: 90, y: 80, label: "Users" },
            { id: "orders", x: 230, y: 80, label: "Orders", highlight: true },
          ]}
          edges={[{ from: "orders", to: "users" }]}
          refs={[
            { nodeId: "users", text: "primary key: id" },
            { nodeId: "orders", text: "foreign key: user_id" },
          ]}
        />
      );
    case "indexLookup":
      return (
        <BoxFlow
          boxes={[
            { label: "Without Index", caption: "scan every row" },
            { label: "With Index", caption: "jump to match" },
          ]}
        />
      );
  }
}
