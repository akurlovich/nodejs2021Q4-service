
# Run app
### 1. Сlone repository:

`git clone https://github.com/akurlovich/nodejs2021Q4-service.git`

### 2. Move to folder:

`cd nodejs2021Q4-service`

### 3. Checkout to branch "develop":

`git checkout PostgreSQL_Typeorm`

### 4. Install dependencies:

`npm i`

### 5. In the **first** terminal:

`docker-compose up -d --build`

`docker-compose up`
### 6. In the **second** terminal:

`npm run docker:sh`

`npm run migration:generate`

`npm run migration:run`

### 7. In the **third** terminal:
`npm run test:auth`


