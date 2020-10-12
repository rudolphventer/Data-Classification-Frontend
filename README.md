
  
  

# 🏛 Welcome to my Classy! 🏛

  

My name is Rudolph Venter and Classy is my text classification website front-end. Available at http://classy-frontend.s3-website.eu-central-1.amazonaws.com or [classy.rudolphventer.me](http://classy.rudolphventer.me)


## --🧱--The Stack--🧱--
I used Node+Vue for the fontend with Axios and HTML forms for uploading files and making requests. The front-end is hosted on an AWS S3 bucket with AWS CodeBuild and CodePipeline with a webhook attached to this GitHub repo. Every time I commit to the master branch the source is copied to CodePipeline, built using CodeBuild and copied to an S3 bucket set up as a static file host.

The API is hosted on a free Heroku dynamo for simplicity, this is why the site can take up to 30 seconds to load. 

  
### Libraries and packages

*  [Axios](https://www.npmjs.com/package/axios)
* [JWTDecode](https://www.npmjs.com/package/jwt-decode)
 

## --⚙--How it Works--⚙--

The real magic happens at the API level, you can see the repo for it [here](https://github.com/rudolphventer/Data-Classification-API)
  

## --🌟--What's it do Though?--🌟--
There are several pages, login, register, upload and myfiles, with an "edit file" component that is reused on the upload and myfiles pages.

 A walk-through:
 * When a user registers an account, a post is sent to the API, the user is routed to the login page.
 * When a user logs in, a post is sent to the API, it returns a JWT that is kept in localstorage.
 * Every page checks for the JWT to make sure it is valid, if not the user is routed back to the login page.
 * The upload page accepts a file upload and sends a formdata object with the file along with the user's JWT to the API. The API returns the header object, this is passed to the edit component which allows a user to edit the file's headers if they want.
 * The myfiles page requests every object associated with a username by passing the JWT to the API, the objects are then listed, if one is clicked, the ID is passed to the edit component allowing changes to be made.

## --💻--Project setup--💻--


```

npm install

```

  

### Compiles and hot-reloads for development

```

npm run serve

```

  

### Compiles and minifies for production

```

npm run build

```

  

### Lints and fixes files

```

npm run lint

```

  

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
