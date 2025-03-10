# React Native Expo Project (Interview Assessment)

## Features Implemented

1. **Form Validation**:
   - Implemented form validation using `yup` and `react-hook-form` for all forms.
2. **Password Requirement Feature**:
   - Ensures all passwords entered by a user meet the specified requirements from the Figma design.
3. **Face Verification & Document Upload**:
   - Users can take a picture of themselves for face verification.
   - Users can upload documents using `expo-image-picker` and `expo-document-picker`.
4. **Biometric Login Feature**:
   - Detects the type of biometric (Fingerprint or Face ID) available on the user’s device.
   - Uses detected biometric type for authentication.

## Steps to Setup and Run the Project Locally

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/AdebayoBunmiSolomon/Ruubix.git
   ```
2. **Navigate to the Project Directory**:
   ```bash
   cd <project-directory>
   ```
3. **Install Dependencies**:
   ```bash
   npm install
   ```
4. **Start the Project**:
   ```bash
   npx expo start
   ```
5. **Run on Emulator or Physical Device**:
   - For Android: Press `a` in the terminal or scan the QR code with the Expo Go app.
   - For iOS: Press `i` in the terminal or scan the QR code with the camera app on iOS device.

## Libraries and Dependencies Used

- `react-native-navigation`: For navigation between screen within the application.
- `react-hook-form`: For handling form validation and state management.
- `yup`: For schema-based form validation.
- `expo-image-picker`: For handling image picking and taking photos for face verification.
- `expo-document-picker`: For handling document uploads.
- `expo-local-authentication`: For implementing biometric authentication.

## Screen Recording

Please refer to the attached video file to view the app running on a physical device.
![App Demo](./demo.mp4)
