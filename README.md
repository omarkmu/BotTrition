# BotTrition

A website that allows users to calculate their BMI and search for
information about foods and diets. You can view the project hosted on
[Heroku](https://heroku.com/) at https://bottrition-sprint1.herokuapp.com.

This project utilizes the
USDA [FDC database](https://fdc.nal.usda.gov/api-key-signup.html)
for retrieving information about foods.

## Usage

To build the code locally with [npm](https://www.npmjs.com/)
and [pip](https://pypi.org/project/pip/), run the following commands:

```bash
npm install
npm run build
pip install -r requirements.txt
```

In order to successfully run the app, the following environment variables
must be set:

- `DATABASE_URL`: The URL to a PostgreSQL database.
- `secret_key`: The secret key required by Flask to handle sessions.
- `FDC_KEY`: An API key provided by the USDA
[FDC database](https://fdc.nal.usda.gov/api-key-signup.html).
- `HOST` *(optional)*: The hostname to listen to (defaults to `"0.0.0.0"`).
- `PORT` *(optional)*: The port of the webserver (defaults to `8080`).

To run the app, run `python app.py`.

## Linting

### pylint

This project makes use of [pylint](https://pylint.org/) for Python linting.

The pylint warnings `no-member`, `invalid-envvar-default`,
and `too-few-public-methods` are disabled via the
[`.pylintrc`](./.pylintrc) file. These warning types were included
in the allowed types to ignore. The pylint command must be run as
`pylint --rcfile=.pylintrc [file]` to properly ignore these warnings.

### eslint

This project makes use of [eslint](https://eslint.org/) for Javascript linting.

The eslint warnings `react/no-array-index-key`,
`react-hooks/exhaustive-deps`, and `react/jsx-filename-extension` are disabled
via the [`package.json`](./package.json) file. These warnings types were
included in the allowed types to ignore.

Additionally, the following warnings were ignored:

- `react/function-component-definition`: This rule was ignored because the only
suggested fix that did not generate a linter warning was a strange pattern
which required repeating function names: `const App = function App() { ... }`.
- `react/prop-types`: This rule was ignored because strict prop typing is not
necessary for our project.
- `linebreak-style`: This rule was ignored because the core.autocrlf config
setting of git was causing code to suddenly break after passing linter checks due to
the replacement of CRLF line endings by LF line endings.
