# Google Two Factor Authentication
Google two factor Authentication using ASP.NET Core and React.js

This project implements a two-factor authentication system using Google Authenticator. It consists of a frontend and backend component, with the backend built using ASP.NET Core Web API and MSSQL database, and the frontend developed using React.js. The frontend communicates with the backend using both AJAX and React Hooks.

## Prerequisites

Before running this project, please ensure you have the following:

- [Google Authenticator](https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2) app installed on your device (available on Play Store or App Store).
- Visual Studio or any other suitable development environment for ASP.NET Core.
- Node.js and npm (Node Package Manager) installed on your machine.
- It is advisable to use VS Code for react

## Backend Setup

1. Clone the project repository from GitHub: [https://github.com/your-username/Google-Two-Factor-Authentication](https://github.com/your-username/Google-Two-Factor-Authentication)

2. Open the backend solution in Visual Studio or your preferred development environment.

3. Locate the `appsettings.json` file in the project's root directory and open it.

4. Inside the `ConnectionStrings` section, update the `DefaultConnection` value with your MSSQL database connection string. This will allow the backend to connect to the database.

5. Run the project to automatically create the necessary database tables and populate the `Registration` table using the provided query below.

```sql
CREATE TABLE Registration (
    Id INT PRIMARY KEY,
    Username VARCHAR(250),
    Password VARCHAR(250)
);
```

## Frontend Setup

1. Navigate to the `frontend` directory of the cloned repository.

2. Open a terminal or command prompt in this directory.

3. Install the required dependencies by running the following command:

```bash
npm install
```

4. Once the installation is complete, start the development server with the following command:

```bash
npm start
```

5. The frontend should now be running on `http://localhost:3000` in your web browser.

## Usage

1. Access the frontend application by opening `http://localhost:3000` in your web browser.

2. Register a new user by providing a unique username and password, directly add user details into database using Visual Studio.

3. Once registered, you will be redirected to the login page. Enter your username, password after Successful login you will be redirected to two factor Authentication.

4. Open the Google Authenticator app on your device.

5. Scan the displayed barcode using the Google Authenticator app to set up the two-factor authentication.

6. The app will generate a one-time password (OTP) based on the shared secret key.

7. Enter the generated OTP to complete two factor Authentication.

8. If the credentials and OTP are valid, you will be granted access to the Home page.

## Contributing

Contributions to this project are welcome. If you encounter any issues or have suggestions for improvement, please create a new issue on the GitHub repository.
