# SOEN390-MiniCap (Condo Management System)
<p align="center">
  <a href="https://github.com/Ahmad-Elmahallawy/SOEN390-MiniCap">
    <h1 align="center">Condo Management System</h1>
  </a>
</p>

<p align="center">
  <a aria-label="Typescript" href="https://www.typescriptlang.org/">
    <img alt="" src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"> 
  </a>
  <a aria-label="Javascript" href="">
    <img alt="" src="https://img.shields.io/badge/Javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white">
  </a>
      <a aria-label="VSCode" href="https://code.visualstudio.com/">
    <img alt="" src="https://img.shields.io/badge/Visual_Studio_Code-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white">
    </a>
    <a aria-label="Webstorm" href="https://code.visualstudio.com/">
    <img alt="" src="https://img.shields.io/badge/Webstorm-000000?style=for-the-badge&logo=webstorm&logoColor=white">
    </a>
        <a aria-label="Figma" href="https://www.figma.com">
    <img alt="" src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white">
  </a>
</p>
<p align="center">
  <a aria-label="React" href="https://www.npmjs.com/">
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB">
  </a>
    <a aria-label="Postgresql" href="https://www.postgresql.org/">
    <img alt="" src="https://img.shields.io/badge/Postgresql-4169E1?style=for-the-badge&logo=postgresql&logoColor=white">
  </a>
  <a aria-label="Prisma" href="https://www.prisma.io/">
    <img alt="" src="https://img.shields.io/badge/prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white">
  </a>
  <a aria-label="GitKraken" href="https://www.gitkraken.com/">
    <img alt="" src="https://img.shields.io/badge/GitKraken-179287?style=for-the-badge&logo=GitKraken&logoColor=white">
  </a>
  <a aria-label="ExpressJS" href="https://www.npmjs.com/">
    <img alt="" src="https://img.shields.io/badge/ExpressJS-17202C?style=for-the-badge&logo=express&logoColor=white">
  </a>
      <a aria-label="redis" href="https://redis.io/">
    <img alt="" src="https://img.shields.io/badge/redis-DC382D?style=for-the-badge&logo=redis&logoColor=white">
  </a>
</p>
<p align="center">
  <a aria-label="Jest" href="https://www.npmjs.com/">
    <img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=61DAFB">
  </a>
    <a aria-label="Sonarqube" href="https://www.sonarsource.com/products/sonarqube/">
    <img alt="" src="https://img.shields.io/badge/Sonarqube-4E9BCD?style=for-the-badge&logo=sonarqube&logoColor=white">
  </a>
  <a aria-label="Cypress" href="https://www.cypress.io/">
    <img alt="" src="https://img.shields.io/badge/Cypress-69D3A7?style=for-the-badge&logo=cypress&logoColor=white">
  </a>
      <a aria-label="Github Actions" href="https://github.com/features/actions">
    <img src="https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white">
  </a>
    <a aria-label="Eslint" href="https://eslint.org/">
    <img alt="" src="https://img.shields.io/badge/eslint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white">
  </a>
</p>
<p align="center">
  <a aria-label="Docker" href="https://www.docker.com/">
    <img alt="" src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white">
  </a>
  <a aria-label="Portainer" href="https://www.portainer.io/">
    <img alt="" src="https://img.shields.io/badge/Portainer-13BEF9?style=for-the-badge&logo=portainer&logoColor=white">
  </a>
  <a aria-label="Minio" href="https://min.io/">
    <img src="https://img.shields.io/badge/minio-C72E49?style=for-the-badge&logo=minio&logoColor=white">
  </a>
    <a aria-label="cloudflare" href="https://www.cloudflare.com/">
    <img alt="" src="https://img.shields.io/badge/cloudflare-F38020?style=for-the-badge&logo=cloudflare&logoColor=white">
  </a>
</p>

# Project Information 🚀

[![MIT license](https://img.shields.io/badge/License-MIT-yellow.svg)](http://perso.crans.org/besson/LICENSE.html)
[![npm version](https://badge.fury.io/js/npm.svg)](https://badge.fury.io/js/npm)

## Host Websites

- **Production**: [condos.happyfir.com](https://condos.happyfir.com/)
- **Development**: [devcondos.happyfir.com](https://devcondos.happyfir.com/)

## Running & Building the project 🔨
- For frontend
```
npm install
npm run start
```
- For backend
```
npm install
npm run dev
```
- For prisma studio
```
npm prisma studio
```
- For db dev connection
```
cloudflared access tcp --hostname devdbcondos.happyfir.com --url localhost:5433
```
- For db prod connection
```
cloudflared access tcp --hostname dbcondos.happyfir.com --url localhost:5433
```

## Naming Conventions
In this project, we adhere to certain naming conventions to ensure consistency and clarity throughout the codebase. These conventions apply to variables, functions, classes, files, and any other identifiers used in the project.
1. Variable Naming
- Variables should be named using descriptive and meaningful names.
- Use snake_case for variable names.
- Avoid using single-letter variable names except for simple loop counters
```
// Good
let first_name = "Alex";
let last_name = "Smith";

// Avoid
let firstName = "Smith";
```

2. Function Naming
- Function names should accurately describe the action or behavior performed by the function.
- Use camelCase for function names.
```
// Good
function calculateTotalPrice(){
  // Function logic here
}

// Avoid
function calc_price(){
  // Function logic here
}
```
3. File Naming
- File names should be descriptive and reflect the content or purpose of the file.
- Use camelCase for file names.
```
userController.js
condoController.js
```
4. Constant Naming
- Constants should be named using all uppercase letters.
- Use underscores (_) to separate words in constant names.
```
const MAX = 3;
const PI = 3.41;
```
## Team Members (Team 6)
| Name   | GitHub         | Student ID | Role |
|--------| -----          | -----------| -----|
| Hoang Minh Khoi Pham | HoangMinhKhoiPham | 40162551 | Developer  |
| Michaël Gugliandolo  | Mika24boss        | 40213419 | Developer  |
| Jessey Thach         | jesseythach          | 40210440 | Developer  |
| Mahanaim Rubin Yo    | AyoMahan          | 40178119 | Developer  |
| Vanessa DiPietrantonio  | vanessadp17         | 40189938 | Developer  |
| Ahmad Elmahallawy    | Ahmad-Elmahallawy          | 40193418 | Developer  |
| Clara Gagnon    | clarag02         | 40208598 | Developer  |
| Khanh Huy Nguyen    | huy2272          | 40125396 | Developer  |
| Jean-Nicolas Sabatini-Ouellet    | wolfie7679 | 40207926 | Developer  |
| Mohamad Mounir Yassin    | MoMounirYas          | 40198854 | Developer  |

## Introduction 

## Project Description: Condo Management Systems

The Condo Management Systems project aims to develop a comprehensive software solution encompassing a simplified condo management application and a companion website. This system is designed to streamline the management operations of condominium properties, catering to the needs of public users, condo owners, rental users, and condo management companies.

### Key Features:

#### User Profiles:
- Public users can create unique profiles with essential information such as a profile picture, username, contact email, and phone number.
- Registration keys obtained from condo management companies are required for both condo owners and rental users to access the system.

#### Property Management:
- Condo owners can access a personalized dashboard providing insights into their properties, including general information, financial status, and request statuses.
- Condo management companies can create profiles for properties under their management, detailing property-specific information such as name, unit count, parking count, and address.
- Upload and share condo files, such as declarations and meeting minutes, accessible to all condo owners.

#### Unit Management:
- Detailed information for each condo unit, parking spot, and locker can be entered, including ownership details, occupant information, and associated condo fees.
- Condo management companies can send registration keys to link condo units with user profiles.

#### Financial System:
- Simplified financial management allows condo management companies to set condo fees, record operational budgets and costs, and generate annual reports.
#### Reservation System:
- Setup and manage common facilities for reservations, allowing users to book facilities via a calendar-like interface.
- Show availabilities of common facilities and follow a first-come-first-serve booking system.
#### Role-based Access Control:
- Set up different roles for employees responsible for property management, such as managers or finance personnel.
#### Request Management:
- Condo owners can submit various requests, which are assigned to corresponding employees for resolution.
- Users have access to a notification page to track the status of their requests.
#### Additional Features:
- Forum and Events: Users can participate in discussions via a forum and organize or attend events within the community.
- Discounts and Offers: Condo management companies can list coupons/offers visible to property occupants.
# Diagrams
## Domain Model
![Diagrams-Domain Model drawio](https://github.com/Ahmad-Elmahallawy/SOEN390-MiniCap/assets/97756628/08fcadb1-b122-4081-a1f2-772e96e6f52d)

## Class Diagram
![Diagrams-Class Diagram drawio](https://github.com/Ahmad-Elmahallawy/SOEN390-MiniCap/assets/97756628/323bfa9d-6df0-475d-8653-fe6b6beeb0dc)

## Deployment Diagram
![Diagrams-Deployment Diagram drawio](https://github.com/Ahmad-Elmahallawy/SOEN390-MiniCap/assets/97756628/08725aa6-bf52-4859-ab86-9d6279c1d21c)

## Component Diagram
![Diagrams-Component Diagram drawio](https://github.com/Ahmad-Elmahallawy/SOEN390-MiniCap/assets/97756628/6a25983e-5242-4ce3-a9f4-1c683d3d4b0a)

## UseCase Diagrams
| Tenant Use Case Diagram | Condo Owner Use Case Diagram | Manager Use Case Diagram |
| ------------------------ | ---------------------------- | ------------------------ |
| <img width="423" alt="Tenant Use Case Diagram" src="https://github.com/Ahmad-Elmahallawy/SOEN390-MiniCap/assets/97756628/4036ade6-807f-4ecd-b61f-8fc6f8beb88d"> | <img width="470" alt="Condo Owner Use Case Diagram" src="https://github.com/Ahmad-Elmahallawy/SOEN390-MiniCap/assets/97756628/bb01444d-19f2-458a-bbf1-dd81a089b6a4"> | <img width="493" alt="Manager Use Case Diagram" src="https://github.com/Ahmad-Elmahallawy/SOEN390-MiniCap/assets/97756628/5b13037a-d793-48c0-9e4f-09eaf6064bc9"> |

## Activity Diagram
| Public User Registration Activity Diagram | Public User Login Activity Diagram | Reservation Activity Diagram | Financial System Activity Diagram |
| ------------------ | ------------------ | ------------------ | ------------------ |
| ![Public User Registration Activity Diagram](https://github.com/Ahmad-Elmahallawy/SOEN390-MiniCap/assets/97756628/9bd236c5-6236-4b7d-bce9-2abfc2edb1dc) | ![Public User Login Activity Diagram](https://github.com/Ahmad-Elmahallawy/SOEN390-MiniCap/assets/97756628/c7474972-5dfc-4b3d-901f-691edf176a25) | ![Reservation Activity Diagram](https://github.com/Ahmad-Elmahallawy/SOEN390-MiniCap/assets/97756628/38ae81d2-77f1-4efd-8367-81eff054bf29) | ![Financial System-Activity-Diagram](https://github.com/Ahmad-Elmahallawy/SOEN390-MiniCap/assets/97756628/eb51a81a-b6e4-41cf-826f-f7d535cf9dca) |


## Sequence Diagram
| Update User Info Diagram | Reservation Diagram | Financial System Diagram | 
| ------------------ | ------------------ | ------------------ | 
| <img width="510" alt="Screenshot 2024-02-06 at 6 22 48 PM" src="https://github.com/Ahmad-Elmahallawy/SOEN390-MiniCap/assets/97756628/921e50d3-b201-4760-89a4-67ff17c6f69a"> | <img width="509" alt="Screenshot 2024-02-06 at 6 23 12 PM" src="https://github.com/Ahmad-Elmahallawy/SOEN390-MiniCap/assets/97756628/cf39dd1b-d503-4e5f-ba75-9488c8c94654"> | <img width="538" alt="Screenshot 2024-02-06 at 6 23 31 PM" src="https://github.com/Ahmad-Elmahallawy/SOEN390-MiniCap/assets/97756628/e4572173-c97a-4f64-b5cd-4c93abf4854f"> |


# Web Application UI
| HomePage | SignInPage |
|----------|------------|
| <img width="525" alt="HomePage" src="https://github.com/Ahmad-Elmahallawy/SOEN390-MiniCap/assets/97756628/7ad2c66f-28b2-4b67-8e53-31e8ce22a5f3"> | <img width="524" alt="SignInPage" src="https://github.com/Ahmad-Elmahallawy/SOEN390-MiniCap/assets/97756628/a9ff95cd-3a3f-4f8f-9eeb-42ab634a05ac"> |

| SignUpPage | ProfilePage |
|------------|-------------|
| <img width="527" alt="SignUpPage" src="https://github.com/Ahmad-Elmahallawy/SOEN390-MiniCap/assets/97756628/025e7f1f-ff32-4506-864d-63930612c67c"> | <img width="521" alt="ProfilePage" src="https://github.com/Ahmad-Elmahallawy/SOEN390-MiniCap/assets/97756628/7eb727cd-a422-4019-bc2b-7fb0615ec119"> |

| ManagerSignUpPage |
|--------------------|
| <img width="523" alt="ManagerSignUpPage" src="https://github.com/Ahmad-Elmahallawy/SOEN390-MiniCap/assets/97756628/169a1f5a-d8af-42d5-ba35-ccf1a1a16e10"> |
# Mobile Application UI
## iOS
| WelcomePage | SignInPage |SignUpPage |
|----------|------------|------------|
| ![Simulator Screenshot - iPhone 15 Pro - 2024-02-27 at 02 01 18](https://github.com/Ahmad-Elmahallawy/SOEN390-MiniCap-Team6/assets/97756628/ec0e45f8-ad00-41c9-ad87-31700c03e4e8) | ![Simulator Screenshot - iPhone 15 Pro - 2024-02-27 at 02 01 33](https://github.com/Ahmad-Elmahallawy/SOEN390-MiniCap-Team6/assets/97756628/44269025-088e-44ce-8ed9-111853221cf4) |![Simulator Screenshot - iPhone 15 Pro - 2024-02-27 at 02 01 13](https://github.com/Ahmad-Elmahallawy/SOEN390-MiniCap-Team6/assets/97756628/491ec0c6-105c-4f4d-9203-b56c5a033d1e)|

| CondoDetailPage | ProfilePage | CreateNewCondoPage |
|------------|-------------|-------------|
|![Simulator Screenshot - iPhone 15 Pro - 2024-02-27 at 03 53 53](https://github.com/Ahmad-Elmahallawy/SOEN390-MiniCap-Team6/assets/97756628/b424cb23-626a-49e8-9458-0a5094dfa594)|![Simulator Screenshot - iPhone 15 Pro - 2024-02-27 at 03 25 53](https://github.com/Ahmad-Elmahallawy/SOEN390-MiniCap-Team6/assets/97756628/3bf28d21-6544-486f-90a4-3a18caedc231) | ![Simulator Screenshot - iPhone 15 Pro - 2024-02-27 at 03 26 35](https://github.com/Ahmad-Elmahallawy/SOEN390-MiniCap-Team6/assets/97756628/8475184a-05d9-40d2-8f78-da3e9c318c67)|


| HomePage | FavoritePage | SettingPage |
|------------|-------------|-------------|
| ![Simulator Screenshot - iPhone 15 Pro - 2024-02-27 at 03 43 53](https://github.com/Ahmad-Elmahallawy/SOEN390-MiniCap-Team6/assets/97756628/545d7357-36f6-4504-98cf-5fb64a521b97) | ![Simulator Screenshot - iPhone 15 Pro - 2024-02-27 at 03 25 43](https://github.com/Ahmad-Elmahallawy/SOEN390-MiniCap-Team6/assets/97756628/ae0a60f4-6350-4c86-905c-e98ebbfc74e2) | ![Simulator Screenshot - iPhone 15 Pro - 2024-02-27 at 03 26 04](https://github.com/Ahmad-Elmahallawy/SOEN390-MiniCap-Team6/assets/97756628/67d055d1-c961-422b-bd81-c0da3aa1cc0c) |

## Android
| WelcomePage | SignInPage | SignUpPage | 
|----------|------------|------------|
| ![Screenshot_20240227_034917](https://github.com/Ahmad-Elmahallawy/SOEN390-MiniCap-Team6/assets/97756628/0a912825-7a22-41c1-99a6-b4d92ae107ce) | ![Screenshot_20240227_034937](https://github.com/Ahmad-Elmahallawy/SOEN390-MiniCap-Team6/assets/97756628/4c54f004-d52b-4b2a-ab4f-f946c600986d) | ![Screenshot_20240227_034926](https://github.com/Ahmad-Elmahallawy/SOEN390-MiniCap-Team6/assets/97756628/6f008e9f-dc8e-4f0b-bbbe-b8b31cb5dbe8) |

| CondoDetailPage | ProfilePage | CreateNewCondoPage |
|------------|-------------|-------------|
|![Screenshot_20240227_033320](https://github.com/Ahmad-Elmahallawy/SOEN390-MiniCap-Team6/assets/97756628/094fb2c5-a260-4596-bd1e-2add74901e1f)| ![Screenshot_20240227_033420](https://github.com/Ahmad-Elmahallawy/SOEN390-MiniCap-Team6/assets/97756628/ff4af4d3-d295-4687-aa14-b96cbaf8dd2d) |![Screenshot_20240227_033447](https://github.com/Ahmad-Elmahallawy/SOEN390-MiniCap-Team6/assets/97756628/0a2ef022-62fc-4402-a075-6c0704758257) |

| HomePage | FavoritePage | SettingPage |
|------------|-------------|-------------|
| ![Screenshot_20240227_033258](https://github.com/Ahmad-Elmahallawy/SOEN390-MiniCap-Team6/assets/97756628/195deb15-9e3a-4349-9792-a2ddb8a38e21) | ![Screenshot_20240227_033402](https://github.com/Ahmad-Elmahallawy/SOEN390-MiniCap-Team6/assets/97756628/0a05aed9-bdb5-4d2d-abe1-ccd9b0c3d282) | ![Screenshot_20240227_033439](https://github.com/Ahmad-Elmahallawy/SOEN390-MiniCap-Team6/assets/97756628/517840cc-1c43-4b37-b162-20a6eecfed9b)




