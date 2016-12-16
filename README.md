# FrugalSheets

## Minimum Viable Product

FrugalSheets is a web application inspired by Google Sheets build using Ruby on Rails and React/Redux. By the end of Week 9, this app will, at a minimum, satisfy the following criteria with smooth, bug-free navigation, adequate seed data and sufficient CSS styling:

- [ ] Hosting on Heroku
- [ ] New account creation, login, and guest/demo login
- [ ] Documents
- [ ] Multiple Sheets per Document
- [ ] Charts
- [ ] Formulas
- [ ] Rich Text Editing
- [ ] Production README [sample](docs/README.md)

## Design Docs
* [View Wireframes][wireframes]
* [React Components][components]
* [API endpoints][api-endpoints]
* [DB schema][schema]
* [Sample State][sample-state]

[wireframes]: docs/wireframes
[components]: docs/component-hierarchy.md
[sample-state]: docs/sample-state.md
[api-endpoints]: docs/api-endpoints.md
[schema]: docs/schema.md

## Implementation Timeline

### Phase 1: Backend setup and Front End User Authentication (1 day)

**Objective:** Functioning rails project with front-end Authentication

### Phase 2: Documents/Sheets Model, API (1 day)

**Objective:** Documents can be created, viewed, edited, and destroyed through
the API.

### Phase 3: Documents Component (2 days)

**Objective:** Documents loaded from the API can be edited with a Spreadsheet
Component

### Phase 4: Sheets (1 day)

**Objective:** User can create many different sheets that retain their own information in charts.

### Phase 5: - Formulas (1 day)

**Objective:** Allow selected range to be used for executing formulas

### Phase 6 Allow Complex Styling in Sheets (1 day)

**Objective:** Cells in sheets can contain Rich Text


### Bonus Features (TBD)
- [ ] Resizing Rows/Columns
- [ ] Track changes by author
