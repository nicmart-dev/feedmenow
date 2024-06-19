# Table of content

[Overview](#overview)<br>
[Install](#install)<br>
[Implementation](#implementation)<br>
[Roadmap](#roadmap)<br>
[Nice-to-haves](#nice-to-haves)

# Feed Me Now!

## Overview

An app that recommends recipes based on ingredients I have in my fridge or pantry list, to save me money, and avoids the temptation to order takeout.

### Problem

TODO

Why?

TODO

### User Profile

TODO

### Features

TODO

## Install

To install and run the application, follow these steps:

Follow the steps on https://github.com/nicmart-dev/feedmenow/wiki/Install-instructions

## Implementation

[Tech Stack](#tech-stack)<br>
[GitHub folder structure](#github-folder-structure)<br>
[APIs](#apis)<br>
[Sitemap, User journey and Screenshots](#sitemap-user-journey-and-screenshots)<br>
[Data](#data)<br>
[Auth](#auth)

### Tech Stack

TBD

- **Front-end:** React.js, React Router (for navigation), Tailwind CSS (for styling), Axios (for API calls)
- **Back-end:** Node.js, Express.js
- **Database:** Airtable
- **Authentication:** TBD
- **Localization:** [react-intl](https://www.npmjs.com/package/react-intl) library for internationalization, using AI translations
- **Datagrid** TanStack Table headless table library
- **Deployment:** TBD

Note: see design documents in the Wiki [here](https://github.com/nicmart-dev/feedmenow/wiki#software-design-documents) for implementation details.

### GitHub folder structure

For ease of maintenance as a small team of 2 developers, a single repository for client and server was created.

```
your-repo/
│
├── client/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ └── ...
│ ├── public/
│ └── ...
│
├── server/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ └── ...
│
├── n8n/
│ ├── workflows/
│ ├── settings/
│ └── ...
│
├── README.md
├── .gitignore
├── package.json
└── ...
```

### APIs

We are using the following external APIs:

TODO

### Sitemap, User journey and Screenshots

See user journey, and sitemap with screenshots in the Wiki [here](https://github.com/nicmart-dev/feedmenow/wiki/Sitemap-and-user-journey).

### Data

TODO

### Auth

TODO

## Roadmap

We are using GitHub Project to manage the roadmap and Kanban board.
Please see the public roadmap [here](https://github.com/users/nicmart-dev/projects/3/views/5).

## Nice-to-haves

TODO
