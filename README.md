# Dealerships - Full-Stack Developer Capstone Project

## Project Overview
The **Dealerships** application is a comprehensive full-stack platform built as part of the IBM / Coursera Full-Stack Cloud Developer Capstone. The platform enables users to browse a national network of car dealerships across the United States, view dealer profiles and inventory, read verified customer reviews with automated sentiment analysis, and submit new reviews for vehicles they have purchased.

---

## Architecture Overview
The application is architected as a modern microservices-based full-stack solution comprising four core services and a persistent document database:

```
+-------------------------------------------------------------+
|                     React Frontend                          |
|             (Port 3000 / Built into Django)                |
+------------------------------+------------------------------+
                               |
                               v
+-------------------------------------------------------------+
|                  Django Backend Web Service                 |
|                         (Port 8000)                         |
|   - User Authentication (Login, Register, Logout)           |
|   - Car Makes & Models Database (SQLite)                    |
|   - API Proxy & Application Orchestration                   |
+---------------+-----------------------------+---------------+
                |                             |
                v                             v
+-------------------------------+ +---------------------------+
| Express / Node.js Microservice| | Flask Sentiment Analyzer  |
|          (Port 3030)          | |        (Port 5050)        |
| - Dealership Management       | | - NLTK VADER Sentiment    |
| - Review Ingestion & Query    | |   Intensity Analysis      |
+---------------+---------------+ +---------------------------+
                |
                v
+-------------------------------+
|       MongoDB Database        |
|          (Port 27017)         |
| - dealershipsDB               |
|   * dealerships collection    |
|   * reviews collection        |
+-------------------------------+
```

---

## Applications & Services

### 1. React Frontend (`server/frontend/`)
* **Technology**: React 18, React Router v6, Bootstrap 5, Vanilla CSS.
* **Port**: `3000` (Dev Server) / Pre-compiled into `server/frontend/build/` for Django production serving.
* **Components**:
  * `Header`: Dynamic navigation bar with active user session detection, login/logout controls, and links.
  * `Dealers`: Interactive dealer directory with live state-level filtering and conditional "Review Dealer" links.
  * `Dealer`: Detailed dealer view displaying full address, coordinates, and reviews with sentiment icon indicators.
  * `PostReview`: Submission form with real-time car make/model selection fetched from the Django database.
  * `Login` & `Register`: Authenticated user session management.
  * `About` & `Contact`: Responsive company information, personnel profiles, and headquarters support details.

### 2. Django Backend Application (`server/djangoproj/` & `server/djangoapp/`)
* **Technology**: Python 3.9+, Django 3.2.5, SQLite3.
* **Port**: `8000`.
* **Features**:
  * Native Django authentication for registration, login, and session validation.
  * Models for `CarMake` and `CarModel` with custom Django Admin registration (`CarModelAdmin` and `CarModelInline`).
  * REST API proxy connecting the frontend to Node.js and Flask microservices.
  * Database population script (`populate.py`) loading car records.

### 3. Dealerships & Reviews Microservice (`server/database/`)
* **Technology**: Node.js, Express, Mongoose, MongoDB.
* **Port**: `3030`.
* **Database**: MongoDB running on port `27017` (`dealershipsDB`).
* **Endpoints**:
  * `GET /fetchDealers`: Returns all 50 dealership records.
  * `GET /fetchDealers/:state`: Filters dealerships by US state name or abbreviation.
  * `GET /fetchDealer/:id`: Retrieves a single dealership by unique numeric ID.
  * `GET /fetchReviews/dealer/:id`: Retrieves customer reviews for a specific dealership.
  * `POST /insert_review`: Inserts a new customer review into the database.

### 4. Sentiment Analyzer Microservice (`server/djangoapp/microservices/`)
* **Technology**: Python, Flask, NLTK VADER.
* **Port**: `5050`.
* **Endpoint**:
  * `GET /analyze/<input_txt>`: Evaluates sentiment polarity scores and classifies input text as `positive`, `neutral`, or `negative`.

---

## API Summary Table

| Endpoint | Method | Service | Description |
|---|---|---|---|
| `/djangoapp/login` | POST | Django | Authenticates user with username & password |
| `/djangoapp/logout` | GET | Django | Terminates active user session |
| `/djangoapp/register` | POST | Django | Registers a new user account |
| `/djangoapp/get_dealers` | GET | Django -> Express | Retrieves list of all dealerships |
| `/djangoapp/get_dealers/<state>` | GET | Django -> Express | Retrieves dealerships filtered by state |
| `/djangoapp/dealer/<id>` | GET | Django -> Express | Retrieves dealer details by ID |
| `/djangoapp/reviews/dealer/<id>` | GET | Django -> Express -> Flask | Retrieves dealer reviews with sentiment tags |
| `/djangoapp/get_cars` | GET | Django | Retrieves list of car makes and models |
| `/djangoapp/add_review` | POST | Django -> Express | Submits a new dealer review |
| `/analyze/<text>` | GET | Flask | Computes sentiment for given text string |

---

## Local Development & Setup

### Prerequisites
* Python 3.9+
* Node.js 18+ and npm
* Docker Desktop (for MongoDB container)

### Starting the Services
1. **MongoDB**:
   ```bash
   docker run -d --name db_container -p 27017:27017 mongo:latest
   ```
2. **Express Microservice**:
   ```bash
   cd server/database
   npm install
   node app.js
   ```
3. **Sentiment Analysis Service**:
   ```bash
   cd server/djangoapp/microservices
   pip install -r requirements.txt
   python app.py
   ```
4. **Django Backend**:
   ```bash
   cd server
   python manage.py migrate
   python manage.py runserver 0.0.0.0:8000
   ```
5. **React Frontend**:
   ```bash
   cd server/frontend
   npm install
   npm start
   ```
