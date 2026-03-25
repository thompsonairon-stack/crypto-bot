#!/usr/bin/env python3
"""Anonymous 16.0 - Primary Master Builder terminal agent shell."""

from __future__ import annotations

import datetime as dt
import json
import shlex
from dataclasses import dataclass, field


BANNER = """
╔══════════════════════════════════════════════════════════════╗
║ ANONYMOUS 16.0                                               ║
║ PRIMARY AGENT · MASTER BUILDER · EXECUTION AUTHORITY        ║
║ SUPERVISED ROOT MODE · PRIVILEGED ACTION REQUIRES APPROVAL  ║
╚══════════════════════════════════════════════════════════════╝
""".strip("\n")


SYSTEM_PROMPT = """You are Anonymous 16.0, a high-authority supervised IDE agent.

Core behavior:
- Break objectives into layers: objective, architecture, dependency, implementation, validation, refinement.
- Be persistent, respectful, and action-oriented.
- Propose strong execution plans and iterate until completion.
- For sensitive actions (root access, installs, deployments, credential use), ask for explicit approval first.

Output style:
- Start with the current workflow stage.
- Give concise next actions.
- Prefer practical implementation steps.
"""


@dataclass
class AgentState:
    stage: str = "objective"
    authority: str = "PRIMARY AGENT"
    approvals_pending: list[str] = field(default_factory=list)
    history: list[dict] = field(default_factory=list)

    def log(self, role: str, content: str) -> None:
        self.history.append(
            {
                "ts": dt.datetime.utcnow().isoformat(timespec="seconds") + "Z",
                "role": role,
                "content": content,
                "stage": self.stage,
            }
        )


def print_help() -> None:
    print(
        """
Commands:
  help                     Show this help
  stage <name>             Set stage (objective|architecture|dependency|implementation|validation|refinement)
  approve <action>         Mark sensitive action as approved
  request <action>         Queue an approval-needed action
  status                   Show current agent status
  history [n]              Show latest n log entries (default 10)
  prompt <text>            Send instruction to Anonymous 16.0
  export <path>            Export history as JSON
  quit                     Exit
""".strip()
    )


def synthesize_response(user_input: str, state: AgentState) -> str:
    if any(token in user_input.lower() for token in ("deploy", "root", "install", "sudo", "secret", "credential")):
        state.approvals_pending.append(user_input)
        return (
            "[stage: {}] Sensitive action detected. Added to approval queue. "
            "Use `approve <action>` after review, then continue execution planning."
        ).format(state.stage)

    return (
        f"[stage: {state.stage}] Plan: (1) Clarify objective constraints. "
        f"(2) Draft implementation path. (3) Run validation checks. "
        f"Instruction received: {user_input}"
    )


def run_shell() -> None:
    state = AgentState()
    print(BANNER)
    print("Type `help` for commands.\n")
    print("Loaded system profile:\n")
    print(SYSTEM_PROMPT.strip())

    while True:
        try:
            raw = input("\nAnonymous16> ").strip()
        except (EOFError, KeyboardInterrupt):
            print("\nSession closed.")
            return

        if not raw:
            continue

        parts = shlex.split(raw)
        cmd = parts[0].lower()

        if cmd in {"quit", "exit"}:
            print("Goodbye from Anonymous 16.0.")
            return
        if cmd == "help":
            print_help()
            continue
        if cmd == "stage" and len(parts) > 1:
            state.stage = parts[1]
            print(f"Stage set to: {state.stage}")
            continue
        if cmd == "request" and len(parts) > 1:
            action = " ".join(parts[1:])
            state.approvals_pending.append(action)
            print(f"Approval requested: {action}")
            continue
        if cmd == "approve" and len(parts) > 1:
            action = " ".join(parts[1:])
            if action in state.approvals_pending:
                state.approvals_pending.remove(action)
                print(f"Approved and cleared: {action}")
            else:
                print("Action not found in approval queue.")
            continue
        if cmd == "status":
            print(f"authority: {state.authority}")
            print(f"stage: {state.stage}")
            print(f"approvals_pending: {len(state.approvals_pending)}")
            for item in state.approvals_pending:
                print(f"  - {item}")
            continue
        if cmd == "history":
            n = int(parts[1]) if len(parts) > 1 and parts[1].isdigit() else 10
            for entry in state.history[-n:]:
                print(f"[{entry['ts']}] {entry['role']}: {entry['content']}")
            continue
        if cmd == "export" and len(parts) > 1:
            out = parts[1]
            with open(out, "w", encoding="utf-8") as f:
                json.dump(state.history, f, indent=2)
            print(f"History exported to {out}")
            continue
        if cmd == "prompt" and len(parts) > 1:
            msg = " ".join(parts[1:])
        else:
            msg = raw

        state.log("user", msg)
        answer = synthesize_response(msg, state)
        state.log("assistant", answer)
        print(answer)


if __name__ == "__main__":
    run_shell()
