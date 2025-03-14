# Stunk with React - Example Apps

This repository contains 10 example applications demonstrating how to use **Stunk** with React for state management.

## Table of Contents

1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Example Apps](#example-apps)
4. [Usage](#usage)
5. [Contributing](#contributing)
6. [License](#license)

## Introduction

[Stunk](https://github.com/I-am-abdulazeez/stunk) is a lightweight, framework-agnostic state management library. This repository showcases 10 different use cases for integrating Stunk with React. You can also switch to other branches to see how Stunk is use in vanilla-js, vanilla-ts.

## Installation

Before running any of the example apps, ensure you have Node.js installed. Then, clone the repository and install dependencies:

```sh
# Clone the repository
git clone https://github.com/I-am-abdulazeez/stunk-test.git
cd stunk-examples

# Install dependencies
yarn install  # or npm install
```

## Example Apps

### 1. **Basic Counter with History mode**

A simple counter app that demonstrates basic Stunk usage.

### 2. **Todo List**

A todo list app showcasing Stunk's state persistence and reactivity.

### 3. **Theme Switcher**

An app demonstrating how to manage a global theme state.

### 4. **Auth Management**

A simple authentication state example using Stunk.

### 5. **Shopping Cart**

An example of a shopping cart with state persistence.

### 6. **Async Data Fetching**

Using `asyncChunk` to manage API calls with `loading`, `error`, and `data` states.

### 7. **Form State Management**

Managing form inputs and validation with Stunk.

### 8. **Notifications System**

A real-time notifications manager.

### 9. **Multistep Wizard**

A multi-step form using Stunk to persist state between steps.

### 10. **Drag & Drop Kanban Board**

A task management board with drag-and-drop functionality.

## Usage

Each example is inside the `apps/` folder. Navigate into any app and start the development server:

```sh
cd apps/basic-counter
yarn dev  # or npm run dev
```

## Contributing

Contributions are welcome! Feel free to fork this repo, make improvements, and submit a pull request.

## License

This project is licensed under the MIT License.
