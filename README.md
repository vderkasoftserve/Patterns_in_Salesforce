# Publish-subscribe Pattern in Salesforce by Volodymyr Derkach (May 2020)

After you've pushed the medatada to the scratch org please assign the 'Admin' permission set to your user
by running the following command in your CLI:
`sfdx force:user:permset:assign -n Admin -u <your_user_name>`

## Project Descritpion

In order to test the functionality please open the app called 'PubSub' in the App Launcher. There you will see two tabs:
'Channel' and 'Followed Items'. You can create and subscribe to some channels you like. After creating a channel you are
able to create posts in the channel feed. All the users that are subscribed to the channel will be able to view the newly
created posts in their 'Followed Items' tab.

