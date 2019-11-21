# README

What is "S.P.E.C"?  -- Introduction is [here](https://gist.github.com/marcy-terui/eff318e12c1796cf0b5f08f43d7e791e).

Theme application is [here](https://github.com/marcy-terui/spec2019-theme).

Benchmarker is [here](https://github.com/marcy-terui/spec2019-benchmarker).

# How to use

# Prerequisite

- AWS Account
- Vue CLI >= 3.8
- Amplify CLI >= 1.7

## Project setup & deploy

Clone source

```bash
git clone git@github.com:hassaku63/serverlessdays2019-spec-frontend.git
cd serverlessdays2019-spec-frontend
```

Install packages

```bash
npm install
# or yarn install
```

Init Amplify project

```bash
amplify init
```

Recreate 'hosting' resources

```bash
# Note:
#   I keep some files related 'hosting' for reference infomation.
#   but you will cannot be deployed as it is...
#   You may complete deployment work by recreate hosting resource. please execute 'amplify hosting remove/add'
amplify hosting remove

amplify hosting add
```

Deploy

```bash
amplify publish
```
