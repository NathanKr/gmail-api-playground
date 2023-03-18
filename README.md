<h2>Motivation</h2>
POC for gmail api send using node server

<h2>Design</h2>
<ul>
<li>use googleapis package</li>
<li>use service account</li>
</ul>

<h2>Setup</h2>
<ol>
<li>Navigate to <a href='https://console.cloud.google.com/workspace-api'>google cloud console</a> and create a google cloud project to use Google Workspace APIs with google project name "Gmail API POC"

<ol>
<li>create google cloud project

![create google cloud project](./figs/1-create-google-cloud-project.png)
</li>

<li>insert google cloud project name and create

![insert google cloud project name and create](./figs/2-google-cloud-project-insert-name-and-create.png)
</li>

<li>google cloud project created

![google cloud project created](./figs/3-google-cloud-project-created.png)
</li>
</ol>

</li>
<li>Enable gmail API for "Gmail API POC" project
<ol>
<li>click workspace and choose project

![click workspace and choose project](./figs/4-click-workspace-and-choose-project.png)

</li>

<li>click APIs button

 ![click APIs button](./figs/5-click-api-button.png)

</li>

<li>Choose gmail API

 ![!Choose gmail API](./figs/6-choose-gmail-api.png)

</li>

<li>click Enable API

![click Enable API](./figs/7-click-enable-api.png)

</li>

<li>Gmail API is enabled

![Gmail API is enabled](./figs/8-gmail-api-is-enabled.png)

</li>

</ol>
</li>
<li>Create credential - service account

<ol>
<li>Navigate to the cerdential screen

![Navigate to the cerdential screen](./figs/9-service-acccount-navigate-to-credentials.png)

</li>

<li>click on manage service account

![click on manage service account](./figs/10-service-acccount-click-on-manage-service-account.png)

</li>

<li>click on create service account

![click-on-create-service-account](./figs/11-service-acccount-click-on-create-service-account.png)
</li>

<li>service account fill template

![service account fill template](./figs/12-service-acccount-fill-form.png)

</li>

<li>service account filled

![account](./figs/13-service-acccount-filled.png)

</li>

<li>service acccount created click manage keys

![service acccount created click manage keys](./figs/14-service-acccount-created-click-manage-keys.png)

</li>

<li>service acccount create keys

![service create keys](./figs/15-service-acccount-created-keys.png)

</li>

<li>service acccount create keys json file

![service acccount create keys json file](./figs/16-service-acccount-created-keys-json-file.png)

</li>

<li>service acccount keys created

![service acccount keys created](./figs/17-service-acccount-created-keys-json-file-created.png)

</li>

</ol>


</li>
<li>Export the service credential file , but git ignored</li>
<li>Grant the service account access to the workspace domain (this remind Share the resource - google sheet file with client_email done <a href='https://github.com/NathanKr/google-sheets-api-playground'>here</a> )</li>
<li>Use the credential file (must be on .gitignore) inside your application which uses gmail api</li>
</ol>


<h2>Reference</h2>
<ul>
<li>the code in index.js is from here<a href='https://github.com/googleapis/google-api-nodejs-client/blob/main/samples/gmail/send.js'>here</a>
</li>
<li>this sample is about gmail api but not using send <a href='https://developers.google.com/gmail/api/quickstart/nodejs'>here</a>however, both googleapis and @google-cloud/local-auth are used</li>
</ul>


<h2>Points of interest</h2>
<ul>
<li>The <a href='https://www.npmjs.com/package/@google-cloud/local-auth'>docs of @google-cloud/local-auth package</a> (40K weekly doanlaods) say that this package should be used as starter project and is not general purpose solution. He suggest to explore other options in <a href='https://github.com/googleapis/google-auth-library-nodejs'> authentication library for Node - googleapis/google-auth-library-nodejs</a> (7M week downloads)</li>
<li>when you look into the code of @google-cloud/local-auth package <a href='https://www.npmjs.com/package/@google-cloud/local-auth?activeTab=explore'>here</a> you can see that it uses google-auth-library (7M week downloads). thus it is a simple wrapper which make it easy to use</li>
</ul>