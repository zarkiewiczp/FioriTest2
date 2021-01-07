<mvc:View controllerName="companyRepo.appName.controller.Supplier"
  xmlns="sap.m"
  xmlns:l="sap.ui.layout"
  xmlns:f="sap.ui.layout.form"
  xmlns:mvc="sap.ui.core.mvc">
  <Page title="Supplier view" class="sapUiResponsiveContentPadding"
    showNavButton="true"
		navButtonPress="navigateBack">
    <headerContent>
      <Toolbar>
        <ToolbarSpacer/>
        <Button text="Delete" press="onDelete"  type="Reject" />
        <Button text="Save" press="onSave" type="Accept"/>
        <Button text="Cancel" press="onCancel" type="Reject" />
      </Toolbar>
    </headerContent>
    <content>
      <f:SimpleForm id ="supplierForm" 
			layout="ResponsiveGridLayout"
			labelSpanXL="4"
			labelSpanL="4"
			labelSpanM="12"
			labelSpanS="12"
			adjustLabelSpan="false"
			columnsXL="2"
			columnsL="2"
			columnsM="1"
			singleContainerFullSize="false">
        <f:content>
          <Title text="Concurrency = 0" visible="{
							path: 'Concurrency',
							formatter: '.isConcurrency'
						}"/>
          <Label text="ID" />
          <Input value="{ID}" editable="false" type="Text" />
          <Label text="Name" />
          <Input value="{Name}" type="Text" />
          <Label text="Concurrency" />
          <Input value="{Concurrency}" type="Number" />
          <Label text="Street" />
          <Input value="{Address/Street}" type="Text" />
          <Label text="City" />
          <Input value="{Address/City}" type="Text" />
          <Label text="ZIP code" />
          <Input value="{Address/ZipCode}" type="Text" />
        </f:content>
      </f:SimpleForm>
    </content>
  </Page>
</mvc:View>
