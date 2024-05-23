# Setup 

## SERVER
for back end 

```
pipenv install
pipenv shell
```
From Termnal then run
```
python server/app.py
```
Check that your server serves the default route http://localhost:5555. You should see a web page with the heading "Project Server".

##  CLIENT
for front end 

To download the dependencies for the frontend client, from terminal run:
```
npm install --prefix client
```
```
npm start --prefix client
```

Check that your the React client displays a default page http://localhost:3000
You should see a web page with the heading "Project Client".
