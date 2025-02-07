# Chargoon Entry Challenge

This project is a React application created using Create React App. It includes various components and functionalities to manage a hierarchical tree structure with user access controls.

## Table of Contents

- [Installation](#installation)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Components](#components)
- [Context](#context)
- [Core Functions](#core-functions)
- [Types](#types)
- [Transport Layer](#transport-layer)
- [Styling](#styling)
- [Testing](#testing)

## Installation

To install the project dependencies, run:

```sh
yarn install
```

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `yarn run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

### `yarn test`

Launches the test runner in the interactive watch mode.

### `yarn run eject`

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

## Project Structure

```plaintext
chargoon-challenge-entry/
├── .gitignore
├── .vscode/
│   └── settings.json
├── package.json
├── public/
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── README.md
├── src/
│   ├── App.tsx
│   ├── appContext.tsx
│   ├── Components/
│   │   ├── ActionBar/
│   │   │   └── index.tsx
│   │   ├── ContextMenu/
│   │   │   └── index.tsx
│   │   ├── Form/
│   │   │   ├── accesses.tsx
│   │   │   ├── basic-information.tsx
│   │   │   ├── index.tsx
│   │   │   └── user-autocomplete.tsx
│   │   ├── Modal/
│   │   │   └── index.tsx
│   │   ├── Sidebar/
│   │   │   └── index.tsx
│   │   ├── SvgIcons/
│   │   │   ├── arrow-down.tsx
│   │   │   ├── arrow-up.tsx
│   │   │   └── orgchart.tsx
│   │   ├── Table/
│   │   │   ├── index.tsx
│   │   │   ├── TableHead.tsx
│   │   │   ├── TableRow.tsx
│   │   │   └── table.css
│   │   ├── Tree/
│   │   │   ├── index.tsx
│   │   │   ├── MiniTree.tsx
│   │   │   ├── mockData.ts
│   │   │   ├── node.tsx
│   │   │   └── searchResult.tsx
│   ├── core/
│   │   ├── constant/
│   │   ├── functions/
│   │   │   └── functions.ts
│   │   └── types/
│   │       └── index.d.ts
│   ├── ErrorBoundry.tsx
│   ├── index.css
│   ├── index.tsx
│   ├── react-app-env.d.ts
│   ├── reportWebVitals.ts
│   ├── setupTests.ts
│   ├── transportLayer.ts
│   └── types.ts
└── tsconfig.json
```

### Components

#### ActionBar

Located in `index.tsx`, this component displays a bar with actions.

#### ContextMenu

Located in `index.tsx`, this component provides a context menu using `rctx-contextmenu`.

#### Form

Located in `Form`, this directory contains multiple form-related components:

- `accesses.tsx`: Displays a list of access options.
- `basic-information.tsx`: Displays basic information form.
- `index.tsx`: Main form component.
- `user-autocomplete.tsx`: Autocomplete component for users.

#### Modal

Located in `index.tsx`, this component provides a modal dialog.

#### Sidebar

Located in `index.tsx`, this component provides a sidebar layout.

#### SvgIcons

Located in `SvgIcons`, this directory contains SVG icon components:

- `arrow-down.tsx`
- `arrow-up.tsx`
- `orgchart.tsx`

#### Table

Located in `Table`, this directory contains table-related components:

- `index.tsx`: Main table component.
- `TableHead.tsx`: Table header component.
- `TableRow.tsx`: Table row component.
- `table.css`: Table styling.

#### Tree

Located in `Tree`, this directory contains tree-related components:

- `index.tsx`: Main tree component.
- `MiniTree.tsx`: Mini tree component.
- `mockData.ts`: Mock data for the tree.
- `node.tsx`: Node component for the tree.
- `searchResult.tsx`: Search result component for the tree.

### Context

#### AppContext

Located in `appContext.tsx`, this file provides a React context for managing the tree data.

### Core Functions

Located in `functions.ts`, this file contains utility functions for managing the tree structure:

- `isLeaf`
- `findNodeByKey`
- `deleteLeaf`
- `pasteNode`
- `findMaxKey`
- `searchTree`
- `arrayFlatter`

### Types

Located in `types.ts`, this file defines TypeScript interfaces used throughout the project:

- `UserType`
- `NodeType`
- `FormSubmitType`

### Transport Layer

Located in `transportLayer.ts`, this file provides functions for fetching data:

- `getAccessList`
- `getNodes`
- `getUsers`

### Styling

Global styles are defined in `index.css`.
