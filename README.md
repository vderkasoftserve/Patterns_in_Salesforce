# This project implements a few GoF patterns in Salesforce. The pattern implementation descriptions are listed below.

After you've pushed the medatada of the project to the scratch org please assign the 'Admin' permission set to your user
by running the following command in your CLI:
`sfdx force:user:permset:assign -n Admin -u <your_user_name>`

# Publish-subscribe Pattern in Salesforce by Volodymyr Derkach (May 2020)

In order to test the functionality please open the app called 'PubSub' in the App Launcher. There you will see two tabs:
'Channel' and 'Followed Items'. You can create and subscribe to some channels you like. After creating a channel you are
able to create posts in the channel feed. All the users that are subscribed to the channel will be able to view the newly
created posts in their 'Followed Items' tab. Also, a custom notification will be sent to every subscriber. You can view
the notifications by clicking the bell in the top right corner of the screen (you may need to wait up to a few minutes
until the notification displays on the bell after the post is created).

# Adapter Pattern in Salesforce by Volodymyr Derkach (May 2020)

In order to test the functionality please open the tab called 'Custom Lookup Test' in the App Launcher, click 'Open Modal'
button and play with 'Custom Lookup' input. Other form element are dummy.

The project implements a workaround of inability to create lwc components dynamically. In order to do that the lwc component
'customLookup' was wrapped into 'CustomLookupWrapper' aura component which in its turn can be created dynamically.

# Proxy Pattern in Salesforce by Volodymyr Derkach (June 2020)

In order to test the functionality please open the app called 'Proxy' in the App Launcher. There you will see a tab called 
'Projects' where you are able to create a new project record by clicking the 'New' button. The functionality of this button
is overridden by our custom aura component. After clicking the 'New' button the Project custom creation page will be opened
and you will be able to populate a number of fields. The validation logic of these page is implemented with using the
Proxy pattern. The example of such validation logic is Name length of maximum 80 characters, if Primary Objective value is
'Revenue' Business Value field becomes mandatory, if value is 'Risk Reduction' then Risk Reduction Benefit field becomes
required. If Is Emerging Work is checked then Comment on Why Emerging Work field becomes required to populate.

