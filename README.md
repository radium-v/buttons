# Buttons

A simple task tracker for tracking simple tasks. Put a device in each room and press a button when you do something. Keep track of how many times you do things, and when you do them.

## Description

There are four main components for the system: the Buttons, the Panels, the Dashboard, and the Server.

### Buttons

The Buttons are the individual trackers that you press when you do something. Each button has a name, a value, and a few other details (TODO: details).

What happens when you press a button depends on the button's type. These types will be further defined later - for now, buttons just increment a counter.

Future button features:
- Buttons can be configured to reset after a certain amount of time. For example, you might have a button for brushing your teeth that resets every 24 hours. If you brush your teeth twice in a day, you'll press the button twice, and the button will show that you've brushed your teeth twice today. The next day, the button will reset to zero, and you'll start over. There's no penalty for not brushing your teeth, but you'll be able to see how many days you've brushed your teeth in a row.
- Buttons can have quotas, but the quotas are not enforced - they're just for informational purposes, and to help you track your goals over time.

### Panels

The panels are the physical devices that you place around your living space. Right now, the working concept is going to be a Raspberry Pi with a touch screen. Each panel can be configured to show different buttons.

All of your Buttons will be available for every panel, and each panel can have a unique set of buttons. For example, you might have a panel in your kitchen that has buttons for ☕️, 💊, and 🗑️, and a panel in your bathroom for 🪥, 🚿, and 🚽.

### Dashboard

The Dashboard is the more detailed web interface for the system. Every interaction with the system will be logged, so you'll be able to see when you pressed a button, and from which panel.

### Server

The Server is the central hub for the system. It handles the database interactions, provides the API, and hosts the web interface. It runs locally on your network, and is accessible from any configured device on your network.

The server uses Express to provide the API, and uses Sqlite for the database. The web interface is built with FAST web components.

## Getting Started

### Prerequisites

- Node.js (v18.16.1, though it may work with older versions)

### Installation

TBD

## Usage

TBD

## License

Distributed under the MIT License. See [`LICENSE`](LICENSE) for more information.
