LINTING:
C++11 added a significant amount of new C++ language features which to date still aren’t used to their full extent. The most visual ones are for sure auto, override, Lambda expressions, range-based for, uniform initialization syntax, you name it. While C++11 is now several years old already, there’s still lots of code bases which don’t use any of the new language features, be it by policy from management, or by pure laziness to avoid the porting effort from the developer side. Clang-Tidy from the LLVM compiler infrastructure project is here to at least overcome the latter, to allow automatic refactoring of your source code so it uses the new language features.
clang-tidy is a famous linting tool for C++ projects.
clang-tidy is a clang-based C++ “linter” tool. Its purpose is to provide an extensible framework for diagnosing and fixing typical programming errors, like style violations, interface misuse, or bugs that can be deduced via static analysis. clang-tidy is modular and provides a convenient interface for writing new checks.
clang-tidy has its own checks and can also run Clang Static Analyzer checks. Each check has a name and the checks to run can be chosen using the -checks= option, which specifies a comma-separated list of positive and negative (prefixed with -) globs. Positive globs add subsets of checks, and negative globs remove them

TESTING:

1. Google Test
   Google developed Google Test for its own internal use, and it has quickly become one of the most popular C++ unit testing frameworks. It’s very easy to use, and it simplifies the process of creating an XML report with the testing results. It’s an open source project hosted at GitHub, and it can be used on Linux, Mac OS X, Windows, and other platforms.
2. Boost Test Library
   Another popular open source C++ unit test framework, the Boost Test Library was created by several people on the C++ standards committee. It’s popular with developers who use the other Boost libraries. Reviewers say that it has excellent documentation and handles exceptions and crashes very well.
3. QA Systems Cantata
   QA Systems Cantata is a paid unit testing tool for C and C++. The company claims that Cantata makes testing faster and less expensive thanks to extensive use of automation. It’s also standards-compliant and includes an Eclipse-based GUI for ease of use.
4. Parasoft C/C++test
   Like Cantata, Parasoft C/C++test is a proprietary tool that supports both C and C++ testing. A leader in the market since the 1990s, it’s an integrated development testing sol
5. Microsoft Visual Studio
   Microsoft’s flagship integrated development environment, Visual Studio, offers integrated tools for C++ testing (as well as tools for other languages), and has several plug-ins that extend its features. The Microsoft Developer Network explains in detail how to set up and run unit tests with the IDE.

BUILDING:

1. Make
2. Modern CMake
3. Ninja
4. SCons
5. Meson
6. MSBuild
7. Waf

CI Alternatives:

1. CircleCI
2. TeamCity
3. Bamboo
4. GitLab
5. Buddy
6. Travis CI
7. Codeship
8. GoCD
9. Wercker
