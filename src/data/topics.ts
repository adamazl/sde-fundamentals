import type { DiagramKind } from "@/components/gitgraphs/types";

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export type TopicTier = "beginner" | "intermediate" | "advanced";

export type ModuleId =
  | "version-control"
  | "testing-debugging"
  | "ci-cd"
  | "code-review"
  | "design-patterns"
  | "databases";

export interface Module {
  id: ModuleId;
  title: string;
  description: string;
}

/** Modules are rendered in this order on the dashboard and in the sidebar. */
export const modules: Module[] = [
  {
    id: "version-control",
    title: "Version Control",
    description: "Track changes and collaborate on code with Git.",
  },
  {
    id: "testing-debugging",
    title: "Testing & Debugging",
    description: "Catch bugs before they reach your users.",
  },
  {
    id: "ci-cd",
    title: "CI/CD",
    description: "Automate building, testing, and shipping code.",
  },
  {
    id: "code-review",
    title: "Code Review",
    description: "Give and receive feedback that makes code better.",
  },
  {
    id: "design-patterns",
    title: "Design Patterns",
    description: "Reusable solutions to common software design problems.",
  },
  {
    id: "databases",
    title: "Databases",
    description: "Store, structure, and query data reliably.",
  },
];

export interface Topic {
  id: string;
  module: ModuleId;
  title: string;
  summary: string;
  explanation: string;
  diagrams: DiagramKind[];
  quiz: QuizQuestion[];
  tier: TopicTier;
  /** Credits required to unlock this topic. Beginner topics are always free. */
  unlockCost?: number;
}

export const topics: Topic[] = [
  {
    id: "init",
    module: "version-control",
    tier: "beginner",
    title: "git init",
    summary: "Turn a folder into a Git repository.",
    explanation:
      "`git init` creates a hidden `.git` folder inside your project. That folder is where Git stores every commit, branch, and bit of history — the rest of your files are untouched.\n\nYou only need to run it once per project. After that, Git starts tracking changes whenever you ask it to.",
    diagrams: ["init"],
    quiz: [
      {
        question: "What does `git init` actually create?",
        options: [
          "A hidden .git folder that stores Git's history for the project",
          "A remote repository on GitHub",
          "A backup copy of all your files",
          "A new branch called main",
        ],
        correctIndex: 0,
        explanation: "`git init` just creates the local `.git` metadata folder — nothing is uploaded anywhere.",
      },
      {
        question: "How many times do you typically run `git init` for a single project?",
        options: [
          "Once, when you first start tracking it with Git",
          "Every time you commit",
          "Every time you open the folder",
          "Once per branch",
        ],
        correctIndex: 0,
        explanation: "Once is enough — Git then tracks the project until you delete the `.git` folder.",
      },
    ],
  },
  {
    id: "add",
    module: "version-control",
    tier: "beginner",
    title: "git add",
    summary: "Stage changes so Git knows what to include in the next commit.",
    explanation:
      "Editing a file changes your working directory, but Git doesn't commit it automatically. `git add <file>` moves those changes into the staging area — a preview of exactly what the next commit will contain.\n\nThis lets you commit only part of your work, like staging one fixed file while leaving an unfinished one out of the commit.",
    diagrams: ["staging"],
    quiz: [
      {
        question: "What is the purpose of the staging area?",
        options: [
          "To let you choose exactly which changes go into the next commit",
          "To permanently save your changes to GitHub",
          "To delete unwanted files",
          "To create a new branch",
        ],
        correctIndex: 0,
        explanation: "Staging is a preview/holding area between your edits and the permanent commit.",
      },
      {
        question: "If you edit two files but only run `git add fileA.txt`, what happens when you commit?",
        options: [
          "Only fileA.txt's changes are included in the commit",
          "Both files' changes are included",
          "Nothing is committed",
          "Git throws an error",
        ],
        correctIndex: 0,
        explanation: "Only staged changes are committed — fileB.txt's edits remain unstaged until you add it too.",
      },
    ],
  },
  {
    id: "commit",
    module: "version-control",
    tier: "beginner",
    title: "git commit",
    summary: "Save a permanent snapshot of your staged changes.",
    explanation:
      "`git commit` takes everything in the staging area and saves it as a permanent, timestamped snapshot in your project's history, along with a message describing what changed.\n\nEach commit points back to its parent commit, forming a chain — that chain is what lets Git show you history, compare versions, and undo mistakes.",
    diagrams: ["commit"],
    quiz: [
      {
        question: "What does a commit capture?",
        options: [
          "A snapshot of the currently staged changes, with a message",
          "Every file that has ever existed in the project",
          "Only the files that changed since the last push",
          "A copy of the remote repository",
        ],
        correctIndex: 0,
        explanation: "A commit is a snapshot of what was staged at that moment, not a full rewrite of history.",
      },
      {
        question: "Why does each commit reference a parent commit?",
        options: [
          "So Git can reconstruct the full project history as a chain",
          "So Git knows which branch to delete",
          "So GitHub can bill you correctly",
          "It doesn't — commits are independent",
        ],
        correctIndex: 0,
        explanation: "The parent links form the commit graph, which is how `git log` and diffing work.",
      },
    ],
  },
  {
    id: "branch",
    module: "version-control",
    tier: "beginner",
    title: "git branch",
    summary: "Create an independent line of development.",
    explanation:
      "A branch is just a movable label pointing at a commit. `git branch <name>` creates a new label pointing at your current commit — creating a branch is instant and cheap because no files are copied.\n\nBranches let you work on a feature or fix without touching `main` until you're ready to merge it back in.",
    diagrams: ["branch"],
    quiz: [
      {
        question: "What is a Git branch, technically?",
        options: [
          "A movable pointer/label to a specific commit",
          "A full copy of the project folder",
          "A separate Git repository",
          "A saved search filter",
        ],
        correctIndex: 0,
        explanation: "Branches are lightweight pointers, which is why creating one is instant.",
      },
      {
        question: "Why create a branch instead of editing `main` directly?",
        options: [
          "To isolate work-in-progress changes until they're ready to merge",
          "Because `main` can only hold one commit",
          "Branches are required before you can run `git add`",
          "To make the repository smaller",
        ],
        correctIndex: 0,
        explanation: "Branching isolates risky or incomplete work from the stable `main` line.",
      },
    ],
  },
  {
    id: "checkout",
    module: "version-control",
    tier: "beginner",
    title: "git checkout",
    summary: "Switch which branch (or commit) you're working on.",
    explanation:
      "`git checkout <branch>` moves `HEAD` — Git's pointer to \"where you currently are\" — to a different branch, and updates your working directory to match that branch's files.\n\nCombine it with `-b` (`git checkout -b feature`) to create a new branch and switch to it in one step.",
    diagrams: ["checkout"],
    quiz: [
      {
        question: "What does `HEAD` represent?",
        options: [
          "A pointer to the branch/commit you currently have checked out",
          "The very first commit in the repository",
          "The remote server's main branch",
          "The staging area",
        ],
        correctIndex: 0,
        explanation: "`HEAD` always points at whatever you're currently \"looking at\" — usually the tip of your current branch.",
      },
      {
        question: "What does `git checkout -b feature` do?",
        options: [
          "Creates a new branch called feature and switches to it",
          "Deletes the feature branch",
          "Merges feature into main",
          "Renames the current branch to feature",
        ],
        correctIndex: 0,
        explanation: "`-b` is shorthand for create-then-switch in a single command.",
      },
    ],
  },
  {
    id: "merge",
    module: "version-control",
    tier: "beginner",
    title: "git merge",
    summary: "Combine changes from one branch into another.",
    explanation:
      "`git merge <branch>` brings another branch's commits into your current branch. If your branch hasn't diverged (no new commits since the branch point), Git does a fast-forward — it just moves the pointer forward, no new commit needed.\n\nIf both branches have new commits, Git creates a three-way merge commit with two parents, combining both histories. This is also when merge conflicts can happen, if the same lines were changed differently on each side.",
    diagrams: ["mergeFastForward", "mergeThreeWay"],
    quiz: [
      {
        question: "When does Git perform a fast-forward merge?",
        options: [
          "When the current branch has no new commits since the other branch diverged",
          "Whenever you type --force",
          "Only when merging into main",
          "Every time you run git merge",
        ],
        correctIndex: 0,
        explanation: "Fast-forward is possible only when there's a straight line from your branch to the target — no divergence to reconcile.",
      },
      {
        question: "What makes a three-way merge different from a fast-forward?",
        options: [
          "It creates a new merge commit with two parent commits",
          "It deletes the source branch automatically",
          "It doesn't require staging",
          "It only works with remote branches",
        ],
        correctIndex: 0,
        explanation: "A three-way merge commit ties both diverged histories together via two parents.",
      },
    ],
  },
  {
    id: "clone",
    module: "version-control",
    tier: "beginner",
    title: "git clone",
    summary: "Copy an existing remote repository to your machine.",
    explanation:
      "`git clone <url>` downloads a full copy of a remote repository — all its history, branches, and files — into a new folder on your machine, and automatically sets up the remote connection (usually named `origin`) for you.\n\nIt's typically the very first command you run when starting to work on an existing project.",
    diagrams: ["remoteClone"],
    quiz: [
      {
        question: "What does `git clone` set up automatically?",
        options: [
          "A remote connection (commonly named origin) pointing back to the source repository",
          "A new empty branch",
          "A merge conflict",
          "A GitHub account",
        ],
        correctIndex: 0,
        explanation: "Cloning wires up `origin` for you so `git pull`/`git push` work immediately.",
      },
      {
        question: "When would you typically use `git clone`?",
        options: [
          "The first time you get a copy of an existing project onto your machine",
          "Every time you save a file",
          "Only when deleting a repository",
          "Instead of git commit",
        ],
        correctIndex: 0,
        explanation: "You clone once to get started; after that you pull and push to stay in sync.",
      },
    ],
  },
  {
    id: "push",
    module: "version-control",
    tier: "beginner",
    title: "git push",
    summary: "Upload your local commits to a remote repository.",
    explanation:
      "`git push` sends the commits you've made locally up to the remote repository (like GitHub), updating the remote branch to match yours.\n\nIf someone else has pushed commits you don't have yet, Git will reject the push until you pull and reconcile those changes first — this protects everyone's work from being silently overwritten.",
    diagrams: ["remotePush"],
    quiz: [
      {
        question: "What does `git push` do?",
        options: [
          "Uploads your local commits to the remote repository",
          "Downloads new commits from the remote",
          "Deletes your local commits",
          "Creates a new local branch",
        ],
        correctIndex: 0,
        explanation: "Push moves commits from your machine up to the shared remote.",
      },
      {
        question: "Why might `git push` be rejected?",
        options: [
          "The remote has commits you don't have locally yet",
          "You haven't run git init",
          "Your files are too large",
          "You're on the wrong operating system",
        ],
        correctIndex: 0,
        explanation: "Git blocks the push to prevent you from overwriting teammates' work — pull first, then push.",
      },
    ],
  },
  {
    id: "pull",
    module: "version-control",
    tier: "beginner",
    title: "git pull",
    summary: "Download and merge changes from a remote repository.",
    explanation:
      "`git pull` fetches new commits from the remote repository and merges them into your current branch in one step — it's essentially `git fetch` followed by `git merge`.\n\nRunning `git pull` regularly keeps your local branch up to date with your teammates' work and reduces the chance of a painful, large merge conflict later.",
    diagrams: ["remotePull"],
    quiz: [
      {
        question: "What two steps does `git pull` combine?",
        options: [
          "Fetching remote commits, then merging them into your branch",
          "Staging and committing",
          "Cloning and branching",
          "Adding and pushing",
        ],
        correctIndex: 0,
        explanation: "`git pull` = `git fetch` + `git merge` in one command.",
      },
      {
        question: "Why pull regularly instead of only right before pushing?",
        options: [
          "It keeps your branch closer to teammates' work, avoiding large conflicts later",
          "It automatically writes your commit messages",
          "It's required before every git add",
          "It deletes old branches for you",
        ],
        correctIndex: 0,
        explanation: "Frequent small merges are far easier to resolve than one big divergence.",
      },
    ],
  },
  {
    id: "stash",
    module: "version-control",
    tier: "intermediate",
    unlockCost: 30,
    title: "git stash",
    summary: "Set aside uncommitted changes temporarily without committing them.",
    explanation:
      "Sometimes you need to switch branches or pull in teammates' work, but your working directory is mid-edit and not ready for a commit. `git stash` shelves those uncommitted changes onto a stack and gives you a clean working directory again.\n\nWhen you're ready to pick the work back up, `git stash pop` reapplies the most recent stash and removes it from the stack. Nothing is lost — it's just parked out of the way.",
    diagrams: ["stash"],
    quiz: [
      {
        question: "What does `git stash` do to your uncommitted changes?",
        options: [
          "Shelves them on a stack and restores a clean working directory",
          "Permanently deletes them",
          "Commits them immediately",
          "Pushes them to the remote",
        ],
        correctIndex: 0,
        explanation: "Stashing sets changes aside without committing or discarding them.",
      },
      {
        question: "How do you bring back the most recently stashed changes?",
        options: ["`git stash pop`", "`git stash delete`", "`git checkout stash`", "`git pull stash`"],
        correctIndex: 0,
        explanation: "`git stash pop` reapplies the latest stash and removes it from the stack.",
      },
    ],
  },
  {
    id: "rebase",
    module: "version-control",
    tier: "advanced",
    unlockCost: 50,
    title: "git rebase",
    summary: "Replay your branch's commits onto a new base for a cleaner, linear history.",
    explanation:
      "`git rebase <branch>` takes the commits unique to your current branch and replays them one by one on top of `<branch>`'s latest commit, instead of tying the two histories together with a merge commit. The result reads as if you'd started your work from that newer point all along.\n\nThis is powerful but rewrites commit history — the replayed commits get new hashes. Avoid rebasing commits that have already been pushed and shared, since anyone else working from the old commits will end up with a diverged, conflicting history.",
    diagrams: ["rebase"],
    quiz: [
      {
        question: "What does `git rebase main` do to your current branch's commits?",
        options: [
          "Replays them on top of main's latest commit, giving them new hashes",
          "Deletes them and starts over",
          "Merges main into your branch with a merge commit",
          "Pushes them directly to main",
        ],
        correctIndex: 0,
        explanation: "Rebase reapplies your commits on a new base rather than creating a merge commit.",
      },
      {
        question: "Why should you avoid rebasing commits you've already pushed and shared?",
        options: [
          "It rewrites their hashes, so collaborators working from the old commits get a diverged history",
          "It's not technically possible",
          "It automatically force-pushes for you",
          "It deletes the remote branch",
        ],
        correctIndex: 0,
        explanation: "Rebasing shared history creates two conflicting versions of the same commits.",
      },
    ],
  },
  {
    id: "unit-testing",
    module: "testing-debugging",
    tier: "beginner",
    title: "Unit Testing",
    summary: "Test a single piece of code in isolation.",
    explanation:
      "A unit test exercises one small piece of code — usually a single function or method — in isolation from the rest of the system, and checks that it behaves the way you expect for a given input.\n\nBecause unit tests are small and don't depend on a database, network, or UI, they run in milliseconds. That speed is what lets you run thousands of them on every change and catch regressions before they ever reach a user.",
    diagrams: ["unitTest"],
    quiz: [
      {
        question: "What does a unit test typically exercise?",
        options: [
          "A single function or method, in isolation from the rest of the system",
          "The entire application running end-to-end",
          "The production database",
          "The deployment pipeline",
        ],
        correctIndex: 0,
        explanation: "Unit tests target one small unit of behavior at a time, which is what keeps them fast and focused.",
      },
      {
        question: "Why are unit tests able to run so quickly?",
        options: [
          "They don't depend on a database, network, or UI",
          "They only run once a year",
          "They skip checking the actual output",
          "They're written in a faster programming language",
        ],
        correctIndex: 0,
        explanation: "No slow external dependencies means a unit test suite can run thousands of cases in seconds.",
      },
    ],
  },
  {
    id: "test-pyramid",
    module: "testing-debugging",
    tier: "beginner",
    title: "The Test Pyramid",
    summary: "Balance unit, integration, and end-to-end tests.",
    explanation:
      "The test pyramid is a rule of thumb for how to split your test suite: lots of fast, cheap unit tests at the bottom, fewer integration tests that check multiple pieces working together in the middle, and a small number of slow, expensive end-to-end tests that drive the whole app like a real user at the top.\n\nInverting the pyramid — mostly end-to-end tests, few unit tests — usually backfires: the suite gets slow, flaky, and hard to debug, because a failure could be caused by almost anything.",
    diagrams: ["testPyramid"],
    quiz: [
      {
        question: "According to the test pyramid, which kind of test should you have the most of?",
        options: [
          "Fast, cheap unit tests",
          "Slow end-to-end tests",
          "Manual QA test scripts",
          "Load tests",
        ],
        correctIndex: 0,
        explanation: "Unit tests form the wide base because they're fast and cheap, so you can afford many of them.",
      },
      {
        question: "What tends to go wrong when a suite is 'inverted' (mostly end-to-end tests)?",
        options: [
          "The suite becomes slow and flaky, and failures are hard to trace to a cause",
          "The suite becomes too fast to be useful",
          "Unit tests stop working",
          "The app can no longer be deployed",
        ],
        correctIndex: 0,
        explanation: "End-to-end tests touch the whole system, so they're inherently slower and more prone to unrelated failures.",
      },
    ],
  },
  {
    id: "debugging",
    module: "testing-debugging",
    tier: "beginner",
    title: "Debugging",
    summary: "Track down and fix bugs systematically.",
    explanation:
      "Debugging goes best as a repeatable cycle: reliably reproduce the bug, isolate exactly where things go wrong (narrowing down with breakpoints, logging, or a debugger), fix the root cause, and then verify the fix actually resolves the original symptom without breaking anything else.\n\nSkipping straight to a fix without first reproducing and isolating the problem is how you end up patching a symptom instead of the actual cause — the bug quietly comes back later in a different form.",
    diagrams: ["debugCycle"],
    quiz: [
      {
        question: "What's the first step in a systematic debugging cycle?",
        options: [
          "Reliably reproduce the bug",
          "Immediately rewrite the function",
          "Deploy a fix and see what happens",
          "Delete the failing test",
        ],
        correctIndex: 0,
        explanation: "You can't verify a fix worked if you can't first make the bug happen on demand.",
      },
      {
        question: "Why is it risky to fix a bug without isolating its root cause first?",
        options: [
          "You may only patch a symptom, and the underlying bug can resurface later",
          "It's technically impossible to do",
          "It makes the code compile faster",
          "It automatically writes a regression test for you",
        ],
        correctIndex: 0,
        explanation: "A fix aimed at the wrong cause often just hides the bug instead of resolving it.",
      },
    ],
  },
  {
    id: "tdd",
    module: "testing-debugging",
    tier: "intermediate",
    unlockCost: 30,
    title: "Test-Driven Development",
    summary: "Write the test before the code it tests.",
    explanation:
      "Test-driven development (TDD) follows a short red-green-refactor cycle: write a failing test for behavior that doesn't exist yet (red), write the minimum code needed to make it pass (green), then clean up the implementation while keeping the test passing (refactor).\n\nWriting the test first forces you to think about the API and expected behavior before the implementation exists, and it guarantees the test actually fails when the behavior is missing — a test you add after the fact might pass for the wrong reason.",
    diagrams: ["tdCycle"],
    quiz: [
      {
        question: "What are the three steps of the TDD cycle, in order?",
        options: [
          "Red (failing test), green (make it pass), refactor (clean up)",
          "Refactor, then write code, then write a test",
          "Deploy, test, rollback",
          "Green, red, green",
        ],
        correctIndex: 0,
        explanation: "Red-green-refactor is the standard name for the TDD loop.",
      },
      {
        question: "Why write the test before the implementation exists?",
        options: [
          "It confirms the test actually fails without the behavior, and clarifies the API upfront",
          "Tests written first run faster",
          "It's required by every testing framework",
          "It skips the need for code review",
        ],
        correctIndex: 0,
        explanation: "A test added after the code can pass for the wrong reason; writing it first proves it's actually checking something.",
      },
    ],
  },
  {
    id: "continuous-integration",
    module: "ci-cd",
    tier: "beginner",
    title: "Continuous Integration",
    summary: "Automatically build and test every change.",
    explanation:
      "Continuous integration (CI) means every time someone pushes code, an automated system checks it out, builds it, and runs the test suite — without anyone having to remember to do it manually.\n\nBecause this happens on every small change instead of occasionally on a big batch, problems get caught within minutes of being introduced, while it's still obvious which commit caused them.",
    diagrams: ["ciFlow"],
    quiz: [
      {
        question: "What triggers a CI run in most setups?",
        options: [
          "Pushing a code change",
          "A scheduled meeting",
          "Manually emailing the build team",
          "Restarting the production server",
        ],
        correctIndex: 0,
        explanation: "CI is automated to run on every push (or PR), not on a manual schedule.",
      },
      {
        question: "Why does running CI on every small change help, compared to testing occasionally?",
        options: [
          "It's much easier to tell which commit caused a failure",
          "It uses less computer time overall",
          "It removes the need for tests entirely",
          "It guarantees the code has no bugs",
        ],
        correctIndex: 0,
        explanation: "A failure right after a small, single-commit push points directly at the cause.",
      },
    ],
  },
  {
    id: "continuous-deployment",
    module: "ci-cd",
    tier: "beginner",
    title: "Continuous Deployment",
    summary: "Automatically ship changes that pass CI.",
    explanation:
      "Continuous deployment (CD) picks up where CI leaves off: once a change passes every automated check, it's automatically released to users with no manual approval step in between.\n\nThis only works safely because it leans on a solid CI suite to catch problems first — CD without trustworthy tests just means broken code reaches users faster. (Some teams use continuous *delivery* instead, which stops just short of auto-releasing and waits for a manual go-ahead.)",
    diagrams: ["cdFlow"],
    quiz: [
      {
        question: "What does continuous deployment do once a change passes all checks?",
        options: [
          "Releases it to users automatically, with no manual approval step",
          "Waits for a human to review it manually every time",
          "Deletes the change",
          "Rolls it back automatically",
        ],
        correctIndex: 0,
        explanation: "That automatic release with no manual gate is what distinguishes deployment from delivery.",
      },
      {
        question: "Why is a strong CI suite a prerequisite for safe continuous deployment?",
        options: [
          "Without trustworthy tests, CD just ships broken code to users faster",
          "CI and CD are unrelated processes",
          "CD requires CI to be disabled",
          "CI slows down deployment on purpose",
        ],
        correctIndex: 0,
        explanation: "CD removes the human safety net, so the automated tests have to be the safety net instead.",
      },
    ],
  },
  {
    id: "pipelines",
    module: "ci-cd",
    tier: "beginner",
    title: "CI/CD Pipelines",
    summary: "Chain build, test, and deploy into automated stages.",
    explanation:
      "A pipeline is the sequence of automated stages a change passes through on its way to production — typically build, then test, then deploy. Each stage only runs if the one before it succeeds, so a failed build never wastes time running tests, and failed tests never let a broken deploy go out.\n\nDefining this as a pipeline (usually as config checked into the repo) makes the process repeatable and visible: anyone can see exactly which stage a change is at, and exactly which stage it failed at.",
    diagrams: ["pipelineStages"],
    quiz: [
      {
        question: "What is a CI/CD pipeline?",
        options: [
          "A sequence of automated stages (like build, test, deploy) that a change passes through",
          "A single command that deploys code with no checks",
          "A manual checklist reviewed once a month",
          "A database migration tool",
        ],
        correctIndex: 0,
        explanation: "A pipeline chains multiple automated stages together, each gating the next.",
      },
      {
        question: "What happens if the build stage of a pipeline fails?",
        options: [
          "Later stages like test and deploy don't run",
          "The test stage runs anyway to double-check",
          "The change deploys with a warning",
          "The pipeline restarts from a random stage",
        ],
        correctIndex: 0,
        explanation: "Stages gate each other — a failure stops the pipeline before wasting time on later stages.",
      },
    ],
  },
  {
    id: "environments",
    module: "ci-cd",
    tier: "intermediate",
    unlockCost: 30,
    title: "Deployment Environments",
    summary: "Promote changes through dev, staging, and production.",
    explanation:
      "Most teams run their app in more than one environment: development (where you build and experiment), staging (a production-like environment for final checks), and production (what real users actually use).\n\nA change is promoted through these environments in order, getting more scrutiny at each step. Catching a problem in staging is cheap and private; catching the same problem in production means real users were affected first.",
    diagrams: ["environmentPromotion"],
    quiz: [
      {
        question: "What is staging typically used for?",
        options: [
          "A production-like environment for final checks before release",
          "Where users interact with the live product",
          "Long-term storage of old code",
          "Running the database backups",
        ],
        correctIndex: 0,
        explanation: "Staging mirrors production closely enough to catch issues before real users see them.",
      },
      {
        question: "Why promote a change through dev → staging → production instead of straight to production?",
        options: [
          "Each stage catches problems more cheaply and privately than the next",
          "It's required by law in most countries",
          "Production is the fastest environment to test in",
          "It makes the code run faster once released",
        ],
        correctIndex: 0,
        explanation: "Earlier environments give you a chance to catch issues before they affect real users.",
      },
    ],
  },
  {
    id: "why-code-review",
    module: "code-review",
    tier: "beginner",
    title: "Why Code Review",
    summary: "Catch bugs and share knowledge before code ships.",
    explanation:
      "Code review means a teammate reads and comments on a change before it merges. A second pair of eyes catches mistakes the author is too close to see, and it spreads knowledge of the codebase across the team instead of it living in just one person's head.\n\nReview also raises the bar on consistency — naming, structure, and conventions tend to converge when someone else is regularly checking the work.",
    diagrams: ["reviewValue"],
    quiz: [
      {
        question: "What is one key benefit of having a teammate review your code before it merges?",
        options: [
          "They can catch mistakes the author is too close to the change to notice",
          "It guarantees the code has zero bugs",
          "It replaces the need for automated tests",
          "It speeds up the merge with no other effect",
        ],
        correctIndex: 0,
        explanation: "A reviewer isn't anchored to the author's assumptions, so they notice different things.",
      },
      {
        question: "Besides catching bugs, what else does regular code review help spread?",
        options: [
          "Knowledge of the codebase across the team",
          "Merge conflicts",
          "Production outages",
          "Unused dependencies",
        ],
        correctIndex: 0,
        explanation: "Reviewing each other's work is one of the main ways knowledge stops being siloed in one person.",
      },
    ],
  },
  {
    id: "pr-workflow",
    module: "code-review",
    tier: "beginner",
    title: "Pull Request Workflow",
    summary: "Propose, discuss, and merge changes through PRs.",
    explanation:
      "A pull request (PR) packages up a branch's commits and proposes merging them, with a description of what changed and why. Reviewers comment directly on the diff, the author pushes follow-up commits to address feedback, and once it's approved and any checks pass, the PR is merged.\n\nThis workflow keeps the discussion attached to the exact code it's about, and keeps a permanent record of why a change was made the way it was.",
    diagrams: ["prWorkflow"],
    quiz: [
      {
        question: "What does a pull request package together?",
        options: [
          "A branch's commits, proposed for merging, with a description of the change",
          "Only the commit messages, with no code",
          "The entire commit history of the repository",
          "A snapshot of the production database",
        ],
        correctIndex: 0,
        explanation: "A PR is a proposal to merge a specific set of commits, described for reviewers.",
      },
      {
        question: "How does an author typically address review feedback on an open PR?",
        options: [
          "By pushing follow-up commits to the same branch",
          "By closing the PR and never reopening it",
          "By emailing the reviewer a new file",
          "By deleting the original commits",
        ],
        correctIndex: 0,
        explanation: "New commits on the branch show up on the same PR, keeping the whole conversation in one place.",
      },
    ],
  },
  {
    id: "giving-feedback",
    module: "code-review",
    tier: "beginner",
    title: "Giving Good Feedback",
    summary: "Write review comments that improve the code, not just criticize it.",
    explanation:
      "Useful review comments describe a concrete observation, explain why it matters, and — where possible — suggest a direction, rather than just asserting that something is wrong. \"This loop re-fetches the same data on every iteration, which could get slow\" gives the author something to act on; \"this is inefficient\" doesn't.\n\nIt also helps to distinguish blocking issues (must fix before merge) from nitpicks or preferences (nice to have) so the author knows what actually needs to change.",
    diagrams: ["feedbackStructure"],
    quiz: [
      {
        question: "What makes a review comment more useful than a bare 'this is wrong'?",
        options: [
          "Explaining the concrete observation and why it matters, ideally with a suggestion",
          "Using stronger language",
          "Leaving it anonymous",
          "Only commenting on style, never on logic",
        ],
        correctIndex: 0,
        explanation: "Specific, actionable feedback is what actually helps an author fix the issue.",
      },
      {
        question: "Why is it helpful to mark a comment as a blocking issue vs. a nitpick?",
        options: [
          "It tells the author what must change before merging vs. what's optional",
          "It makes the PR merge automatically",
          "It hides the comment from other reviewers",
          "It has no real effect on the review",
        ],
        correctIndex: 0,
        explanation: "Labeling severity prevents authors from over- or under-reacting to a comment.",
      },
    ],
  },
  {
    id: "handling-feedback",
    module: "code-review",
    tier: "intermediate",
    unlockCost: 30,
    title: "Responding to Feedback",
    summary: "Address review comments without taking them personally.",
    explanation:
      "Review comments are about the code, not the author — treating them that way makes it much easier to respond well. When a comment is unclear, ask a clarifying question instead of guessing; when you disagree, explain your reasoning rather than silently ignoring it or silently complying.\n\nOnce you've made changes, replying to each comment (or resolving it) and re-requesting review keeps the reviewer from having to re-read the whole diff to figure out what changed.",
    diagrams: ["feedbackResponse"],
    quiz: [
      {
        question: "What's a better response to an unclear review comment than guessing at what it means?",
        options: [
          "Ask a clarifying question",
          "Ignore the comment",
          "Close the pull request",
          "Delete the reviewer's comment",
        ],
        correctIndex: 0,
        explanation: "Clarifying avoids wasted rework from misinterpreting the feedback.",
      },
      {
        question: "Why re-request review after pushing changes that address feedback?",
        options: [
          "It signals the reviewer without making them re-read the whole diff from scratch",
          "It automatically merges the PR",
          "It's required to save the commits",
          "It removes the reviewer from the PR",
        ],
        correctIndex: 0,
        explanation: "A clear signal plus resolved comments lets the reviewer focus on just what changed.",
      },
    ],
  },
  {
    id: "what-is-a-pattern",
    module: "design-patterns",
    tier: "beginner",
    title: "What Is a Design Pattern",
    summary: "A reusable solution to a common design problem.",
    explanation:
      "A design pattern is a named, reusable solution to a problem that comes up repeatedly in software design — not a finished piece of code you copy-paste, but a general shape of solution you adapt to your situation.\n\nHaving a shared name for a pattern (like \"singleton\" or \"observer\") lets developers communicate a whole design idea in one word, instead of re-explaining the same structure from scratch every time.",
    diagrams: ["patternIntro"],
    quiz: [
      {
        question: "What is a design pattern?",
        options: [
          "A reusable, named solution to a recurring design problem",
          "A specific library you must install",
          "A rule enforced by the compiler",
          "A type of database index",
        ],
        correctIndex: 0,
        explanation: "Patterns describe a shape of solution, not literal code to copy in every case.",
      },
      {
        question: "What's the main benefit of patterns having agreed-upon names?",
        options: [
          "Developers can communicate a whole design idea in one word",
          "It makes code run faster automatically",
          "It removes the need for testing",
          "It's required by every programming language",
        ],
        correctIndex: 0,
        explanation: "Shared vocabulary saves everyone from re-explaining the same structure from scratch.",
      },
    ],
  },
  {
    id: "singleton",
    module: "design-patterns",
    tier: "beginner",
    title: "Singleton Pattern",
    summary: "Ensure a class has only one shared instance.",
    explanation:
      "The singleton pattern guarantees that a class has exactly one instance, and gives every part of the program a way to access that same shared instance — commonly used for things like a single shared configuration object or connection pool.\n\nIt's a useful pattern in moderation, but it's also easy to overuse: because a singleton is effectively global state, sprinkling them everywhere makes code harder to test and harder to reason about, since any part of the program could be silently depending on shared state.",
    diagrams: ["singletonPattern"],
    quiz: [
      {
        question: "What does the singleton pattern guarantee?",
        options: [
          "A class has exactly one shared instance, accessible from anywhere",
          "A class can never be instantiated",
          "Every object gets its own independent copy of the data",
          "A method can only be called once",
        ],
        correctIndex: 0,
        explanation: "The defining trait of a singleton is that one instance is shared everywhere it's used.",
      },
      {
        question: "What's a common downside of overusing singletons?",
        options: [
          "They act as global state, making code harder to test and reason about",
          "They make the program impossible to compile",
          "They use significantly more memory than any other object",
          "They can only be used in one file",
        ],
        correctIndex: 0,
        explanation: "Hidden shared state makes it harder to isolate behavior for testing or understand dependencies.",
      },
    ],
  },
  {
    id: "factory",
    module: "design-patterns",
    tier: "beginner",
    title: "Factory Pattern",
    summary: "Create objects without specifying their exact class.",
    explanation:
      "Instead of calling a constructor directly, code asks a factory function or object to create the thing it needs, and the factory decides which concrete class to instantiate based on the input it's given.\n\nThis decouples the calling code from the specific classes involved — you can add a new type of object the factory can produce without touching any of the code that just asks the factory for \"a thing.\"",
    diagrams: ["factoryPattern"],
    quiz: [
      {
        question: "In the factory pattern, how does calling code create an object?",
        options: [
          "By asking a factory to create it, rather than calling a constructor directly",
          "By copying an existing object's memory",
          "By writing a new class every time",
          "By editing the factory's source code at runtime",
        ],
        correctIndex: 0,
        explanation: "The factory takes responsibility for deciding which concrete class to instantiate.",
      },
      {
        question: "What's the main benefit of using a factory instead of direct construction?",
        options: [
          "Calling code is decoupled from the specific concrete classes involved",
          "It makes objects immutable",
          "It removes the need for classes entirely",
          "It guarantees only one object is ever created",
        ],
        correctIndex: 0,
        explanation: "Callers depend on the factory's interface, not on every concrete class it might produce.",
      },
    ],
  },
  {
    id: "observer",
    module: "design-patterns",
    tier: "intermediate",
    unlockCost: 30,
    title: "Observer Pattern",
    summary: "Notify multiple listeners when something changes.",
    explanation:
      "In the observer pattern, a subject keeps a list of observers and notifies all of them whenever its state changes, without needing to know any details about what each observer actually does with that notification.\n\nThis is the pattern behind most event systems and UI frameworks: a button doesn't know or care who's listening for its click event — it just notifies whoever subscribed.",
    diagrams: ["observerPattern"],
    quiz: [
      {
        question: "In the observer pattern, what does the subject do when its state changes?",
        options: [
          "Notifies all of its registered observers",
          "Deletes all of its observers",
          "Pauses until an observer asks for an update",
          "Rewrites its own class definition",
        ],
        correctIndex: 0,
        explanation: "The subject broadcasts a notification to every observer currently registered.",
      },
      {
        question: "Does the subject need to know what each observer does with a notification?",
        options: [
          "No — it just notifies observers without knowing their internal behavior",
          "Yes — it must call a specific method unique to each observer type",
          "Yes — observers must share their source code with the subject",
          "No — because there can only ever be one observer",
        ],
        correctIndex: 0,
        explanation: "Decoupling the subject from observer internals is what makes this pattern reusable.",
      },
    ],
  },
  {
    id: "what-is-a-database",
    module: "databases",
    tier: "beginner",
    title: "What Is a Database",
    summary: "Store and organize data so it can be reliably queried later.",
    explanation:
      "A database stores data in an organized way and lets an application query, update, and rely on it being there — as opposed to keeping everything in memory, which disappears the moment the program stops running.\n\nApplications talk to a database over a connection, sending queries and getting results back, which is what lets many different processes (a web server, a background job, an admin tool) share the same underlying data.",
    diagrams: ["dbQueryFlow"],
    quiz: [
      {
        question: "Why does an application use a database instead of just keeping data in memory?",
        options: [
          "In-memory data disappears when the program stops running",
          "Databases are always faster than memory",
          "It's required by every programming language",
          "Databases don't need a network connection",
        ],
        correctIndex: 0,
        explanation: "Persistence — surviving past the running process — is a core reason to use a database.",
      },
      {
        question: "What lets multiple different processes share the same underlying data?",
        options: [
          "They all query the same database over a connection",
          "They each keep their own separate copy in memory",
          "They communicate only through log files",
          "They must run on the exact same machine",
        ],
        correctIndex: 0,
        explanation: "A shared database is the common source of truth multiple processes can read and write.",
      },
    ],
  },
  {
    id: "sql-vs-nosql",
    module: "databases",
    tier: "beginner",
    title: "SQL vs NoSQL",
    summary: "Two broad approaches to structuring stored data.",
    explanation:
      "SQL (relational) databases organize data into tables with a fixed schema of columns, and are built around relationships between tables enforced by keys — a good fit when your data is structured and consistency between related records matters.\n\nNoSQL databases cover several different models (documents, key-value, wide-column, graph) that generally trade some of that rigid structure and cross-record consistency for flexibility and easier horizontal scaling — a good fit when your data is less structured or you need to scale reads/writes across many machines.",
    diagrams: ["sqlVsNosql"],
    quiz: [
      {
        question: "What are relational (SQL) databases organized around?",
        options: [
          "Tables with a fixed schema, related to each other via keys",
          "Loose collections of unrelated files",
          "A single giant list with no structure",
          "In-memory caches only",
        ],
        correctIndex: 0,
        explanation: "The 'relational' in relational database refers to relationships between structured tables.",
      },
      {
        question: "What do NoSQL databases generally trade off for flexibility and easier scaling?",
        options: [
          "Some rigid schema structure and cross-record consistency",
          "The ability to store any data at all",
          "Network connectivity",
          "The need for an application to query them",
        ],
        correctIndex: 0,
        explanation: "NoSQL's flexibility usually comes at the cost of some of the guarantees a fixed relational schema provides.",
      },
    ],
  },
  {
    id: "keys-and-relationships",
    module: "databases",
    tier: "beginner",
    title: "Keys & Relationships",
    summary: "Link rows across tables with primary and foreign keys.",
    explanation:
      "A primary key uniquely identifies each row in a table — no two rows share one, and it never changes. A foreign key is a column in one table that stores another table's primary key value, creating a link between the two — for example, an `orders` row storing the `user_id` of the customer who placed it.\n\nThis is how relational databases represent relationships without duplicating data: instead of copying a customer's full details into every order, each order just references the customer's key.",
    diagrams: ["keysRelationship"],
    quiz: [
      {
        question: "What makes a primary key useful for identifying a row?",
        options: [
          "It's unique to that row and never changes",
          "It's always a random string",
          "It's the same value across every row",
          "It's only used for display purposes",
        ],
        correctIndex: 0,
        explanation: "Uniqueness and stability are exactly what let a primary key reliably identify one row.",
      },
      {
        question: "What does a foreign key let a table do?",
        options: [
          "Reference a row in another table by its primary key, instead of duplicating its data",
          "Delete rows from another table automatically",
          "Store a copy of every column from another table",
          "Encrypt the referenced row",
        ],
        correctIndex: 0,
        explanation: "Foreign keys link related rows across tables without duplicating the referenced data.",
      },
    ],
  },
  {
    id: "indexes",
    module: "databases",
    tier: "intermediate",
    unlockCost: 30,
    title: "Database Indexes",
    summary: "Trade extra storage for much faster lookups.",
    explanation:
      "Without an index, looking up rows by a column value means scanning every row in the table to check for matches. An index is a separate, sorted structure built on that column that lets the database jump straight to matching rows instead — similar to how a book's index lets you find a topic without reading every page.\n\nIndexes aren't free: they take up extra storage and slow down writes slightly, since the index has to be updated too. That's why databases don't index every column automatically — you add one where a column is queried often enough that the lookup speedup is worth the write cost.",
    diagrams: ["indexLookup"],
    quiz: [
      {
        question: "What does a database have to do to find matching rows without an index?",
        options: [
          "Scan every row in the table",
          "Ask the application for a hint",
          "Automatically create one on the fly",
          "Refuse to run the query",
        ],
        correctIndex: 0,
        explanation: "A full table scan is the fallback when there's no faster structure to consult.",
      },
      {
        question: "Why don't databases just index every column automatically?",
        options: [
          "Indexes cost extra storage and slow down writes, so they're worth it only where lookups justify it",
          "Indexes are free, but only one is allowed per table",
          "Indexes only work on numeric columns",
          "Indexes remove the need for primary keys",
        ],
        correctIndex: 0,
        explanation: "Indexing is a trade-off — you pay in storage and write speed to gain read speed.",
      },
    ],
  },
];
