## 🤝 Team Collaboration Guide – `mernstack-student-collaboration`

This document helps team members follow consistent Git practices when contributing to the project. **The main branch is protected** and managed only by the admin (`star-ELmi`).

---

### 🔀 Branching Strategy

1. **Never push directly to the `main` branch.**
2. Create a feature branch before starting any work:

```bash
# Update your local main
git checkout main
git pull origin main

# Create your feature branch
git checkout -b feature/your-feature-name
```

3. Make your changes and commit them:

```bash
git add .
git commit -m "Add: your feature description"
```

4. Push your branch to GitHub:

```bash
git push origin feature/your-feature-name
```

---

### 🚀 Submitting a Pull Request (PR)

1. Go to the GitHub repo: [GitHub Repo](https://github.com/star-ELmi/mernstack-student-collaboration)
2. You will see a "Compare & pull request" button for your branch.
3. Click it, then write a clear description of your changes.
4. Wait for the admin (`star-ELmi`) to review and merge.

---

### ✅ Branch Naming Conventions

| Type      | Example                 |
| --------- | ----------------------- |
| Feature   | `feature/add-chat`      |
| Bug Fix   | `fix/login-issue`       |
| Refactor  | `refactor/task-service` |
| UI Update | `ui/update-navbar`      |

---

### 🔐 Main Branch Rules (Enforced by Admin)

* ✔️ Pull Request (PR) required for all changes
* ✔️ Minimum 1 admin review required
* ❌ No direct pushes allowed (only `star-ELmi` can push)

---

### 🤖 Auto-check Before Merge (Upcoming Automation)

* [ ] Coming soon: GitHub Actions or CI/CD tools to check code before merge
* [ ] Code must pass `lint` and `build` checks

Admin will notify the team once automation is enabled ✅

---

### 📌 Notes

* Always pull the latest `main` before starting (`git pull origin main`)
* Sync frequently to avoid merge conflicts
* Ask admin before making major changes if unsure

---

For help: Contact `star-ELmi` via GitHub or [istarmohamed503@gmail.com](mailto:istarmohamed503@gmail.com)

**Happy Collaborating 💻✨**
