# Ball Motion (Name TBD)

[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/JanninTeam/ball-motion/test.yml?branch=master)](https://github.com/JanninTeam/ball-motion/actions) [![Codecov](https://img.shields.io/codecov/c/github/JanninTeam/ball-motion)](https://codecov.io/gh/JanninTeam/ball-motion) ![Last Commit](https://img.shields.io/github/last-commit/JanninTeam/ball-motion) ![License](https://img.shields.io/github/license/JanninTeam/ball-motion)

## Running the program

1. Clone the repository `git clone https://github.com/JanninTeam/ball-motion.git`
2. Navigate to the directory `cd ball-motion`
3. Install dependencies `npm install`
4. Run the program `npm start`

5. Running on a mobile device

   - Emulator (Android Studio):

     1. Install Android Studio
     2. Create a virtual device
     3. Run the virtual device
     4. Run the program by pressing `a` on your keyboard in the terminal which executed `npm start`

   - Emulator (Xcode MacOs only):

     1. Install Xcode
     2. Run the program by pressing `i` on your keyboard in the terminal which executed `npm start`

   - Physical device:

     1. Install the Expo Go app on your device
     2. Scan the QR code in the terminal which executed `npm start`

## Testing the program

The program uses the jest testing library and can be tested by running `npm test` in the terminal. This will run all the tests in the `__tests__` directory.

## Contributing

To contribute to this project, please follow the steps below:

1. Fork this repository
2. Create a new branch with a descriptive name of the feature you are working on `git checkout -b feature-name`
3. Add your changes to the new branch `git add files-changed`
4. Commit your changes `git commit -m "commit message"`
5. Push your changes to your forked repository `git push origin feature-name`
6. Create a pull request to merge your changes into the main branch of this repository
