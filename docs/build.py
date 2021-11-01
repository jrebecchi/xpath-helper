#!/usr/bin/env python3
from argparse import ArgumentParser
from pathlib import Path
from shutil import rmtree
from subprocess import run
from venv import EnvBuilder

PACKAGES = [
    "sphinx",
    "sphinx-js",
    "myst-parser"
]

DOCS_PATH = Path(__file__).resolve().parent
VENV_PATH = DOCS_PATH.joinpath("venv")


def create_env(path):
    print(f"Creating virtualenv in {path}...")
    builder = EnvBuilder(with_pip=True)
    builder.create(path)


def rm_env(path):
    print(f"Removing virtualenv at {path}...")
    rmtree(path, ignore_errors=True)


def upgrade_pip(path):
    print(f"Upgrading pip...")
    pip = path.joinpath("bin", "pip")
    run([pip, "install", "--upgrade", "pip"], check=True)


def install_deps(path, packages):
    print(f"Installing dependencies...")
    pip = path.joinpath("bin", "pip")
    run([pip, "install", *packages], check=True)


def build_docs(venv_path, docs_path):
    python = venv_path.joinpath("bin", "python")
    run(
        [python, "-m", "sphinx", "-b", "html", ".", "_build"], cwd=docs_path, check=True
    )


def main():
    print(f"Documentation: {DOCS_PATH}")

    parser = ArgumentParser()
    parser.add_argument("--refresh", action="store_true", default=False)
    args = parser.parse_args()

    if args.refresh:
        rm_env(VENV_PATH)

    if not VENV_PATH.exists():
        create_env(VENV_PATH)
        upgrade_pip(VENV_PATH)
        install_deps(VENV_PATH, PACKAGES)

    build_docs(VENV_PATH, DOCS_PATH)


if __name__ == "__main__":
    main()
