Tissue
======
**T**rack your **issue**s

Tissue turns links to Github Issues into status badges on your page. 

Learn more [here](http://stenington.github.com/tissue).
Everything's on `gh-pages` at the moment, don't worry about `master`.

[![Build Status](https://secure.travis-ci.org/stenington/tissue.png?branch=run-travis-run)](http://travis-ci.org/stenington/tissue)

Until [this gets closed](https://github.com/travis-ci/travis-ci/issues/476), Travis CI will not run `gh-pages`, it seems.
`run-travis-run` is an orphan checkout that should mirror `gh-pages`, allowing Travis CI to run it.

    git checkout run-travis-run
    git checkout gh-pages -- .
    git commit -m "Run, Travis, run"
    git push origin run-travis-run
