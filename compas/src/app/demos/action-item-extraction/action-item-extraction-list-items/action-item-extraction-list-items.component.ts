import { Component, OnInit,ViewChild } from '@angular/core';
import { AudioActionItemExtractionService } from 'src/app/services/audio-action-item-extraction.service'
import { DatePipe } from '@angular/common';

declare var $: any;



@Component({
  selector: 'action-item-extraction-list-items',
  templateUrl: './action-item-extraction-list-items.component.html',
  styleUrls: ['./action-item-extraction-list-items.component.scss'],
  providers: [DatePipe]
})
export class ActionItemExtractionListItemsComponent implements OnInit {

  @ViewChild("sourceTextArea") sourceTextArea;
  @ViewChild("sourceTextAreaPlanId") sourceTextAreaPlanId;

  
  model2: string;
  constructor(public datepipe: DatePipe, private actionItemExtractionService: AudioActionItemExtractionService) {
   
  }



  actionItemsViewModel = [];
  actionItems = [];
  assigneeList = [];
  actionDetails = [];
  isProcessing = false;
  saveStatus = false;
  accessToke = "";
  otherAssignee = "";
  searchAssignee = false;
  planId = "";
  modalData = "";
  modalHeading = "";
  modalClass = "";
  modalIcon = "times-circle";
  getData = [];
  otherEmailField = [];
  emailValidated = [];
  isSavingTask=false;
  tokenStatus = false;
  fileUploadStatus = false;
  content="";
  
  ngOnInit(): void {
  }
  showActionItem(result, assigneeList) {

    if (result.length > 0) {
      this.saveStatus = true;

      this.actionItemsViewModel = [];
      this.actionItems = result;
      this.actionItems.forEach((item,index) => {
        this.otherEmailField[index] = true;
        assigneeList.forEach(suggestions => {

          //this.assigneeList.push(item.assignee); suggestions
          if (suggestions.name === item.assignee) {

            this.assigneeList = [];

            suggestions.suggestions.forEach(assign => {
              let user = assign.name + "<" + assign.email + ">"
              this.assigneeList.push({ key: assign.personalId, value: user });
            });

            this.assigneeList.push({ key: 0, value: "Other" });
            let details = {
              assignee: item.assignee,
              company: item.company,
              deadline: item.deadlineString,
              deadlineDate: item.deadlineDate,
              assigneeUserList: this.assigneeList,
              task: item.task,
              otherEmail :"",
              personalId:""
            }
            this.actionItemsViewModel.push(details);
          }
        });
      });
    } else {
      this.saveStatus = false;
    }
  }
  
  showOtherAssigneeSection(index) {
    let value = (<HTMLSelectElement>document.getElementById('assignee' + index)).value;

    var element = document.getElementById('otherAssigneeEmail' + index);
    var btn = document.getElementById('searchAssigneeBtn' + index);
    
    if (value === '0') {
      this.otherEmailField[index] = false;
      this.saveStatus = false;
    } else {
      this.otherEmailField[index] = true;
    }

  }

  updatePlanner() {
      this.isSavingTask = true;
      let deadline = document.getElementsByClassName('deadlineDate');
      let assignee = document.getElementsByClassName('assignee');
      let task = document.getElementsByClassName('task');
      let assigneeName = document.getElementsByClassName('assigneeName');

      let deadlineData = [].map.call(deadline, item => item.value);
      let assigneeData = [].map.call(assignee, item => item.value);
      let taskData = [].map.call(task, item => item.value);
      let assigneeNameData = [].map.call(assigneeName, item => item.value);


      assigneeData.forEach((assign, index) => {
        let personalId = "";
        if (assign === '0') {
          personalId = (<HTMLSelectElement>document.getElementById('otherAssigneePersonalId' + assigneeNameData[index])).value

        } else {
          personalId = assign;
        }
      
        let details = {
          planId: this.planId,
          assigneeId: personalId,
          task: taskData[index],
          deadline: deadlineData[index]
        }
        this.actionDetails.push(details);

      });
      this.actionItemExtractionService.updatePlanner(this.actionDetails, this.accessToke,
        result => {
          this.isSavingTask = false;
          if (result.message === "success") {
            this.modalHeading = "Success";
            this.modalClass = "text-success";
            this.modalIcon = "check-circle";
            this.modalData = "Tasks exported to MS Teams successfully.";
            $("#dataNotFoundModal").modal('show');
          } else if (result.message === "token expired") {
            this.modalHeading = "Token Expired";
            this.modalClass = "text-danger";
            this.modalIcon = "times-circle";
            this.modalData = "Token expired. Please try again.";
            $("#dataNotFoundModal").modal('show');
          } else {
            this.modalHeading = "Failed";
            this.modalClass = "text-danger";
            this.modalIcon = "times-circle";
            this.modalData = "Error creating task. Please try again.";
            $("#dataNotFoundModal").modal('show');
          }
        },
        error => {
          this.modalHeading = "Failed";
          this.modalClass = "text-danger";
          this.modalIcon = "times-circle";
          this.modalData = "Error creating task. Please try again.";
          $("#dataNotFoundModal").modal('show');
        });
    
  }
  getAssigneeDetails(index,itemValidationForm) { 
    this.searchAssignee= true;
    this.getData[index] = true;
    
    let email = (<HTMLSelectElement>document.getElementById('otherAssigneeEmail' + index)).value;
    this.actionItemExtractionService.getDetailsByEmail(email, this.accessToke,
      result => {
        if (result.message === "success") {
          (<HTMLSelectElement>document.getElementById('otherAssigneePersonalId' + index)).value = result.personalId;
          itemValidationForm.form.controls['personalId'+index].updateValueAndValidity();
          this.searchAssignee = false;
          this.saveStatus = true;
          this.getData[index] = false;
          this.emailValidated[index] = true;
        } else if (result.message === "token expired") {
          this.modalHeading = "Token Expired";
          this.modalClass = "text-danger";
          this.modalIcon = "times-circle";
          this.modalData = "Token expired. Please try again.";
          $("#dataNotFoundModal").modal('show');
          this.saveStatus = false;
          this.searchAssignee = false;
        } else {
          this.modalHeading = "Invalid Email";
          this.modalClass = "text-danger";
          this.modalIcon = "times-circle";
          this.modalData = "No data found. Please check the email id entered.";
          $("#dataNotFoundModal").modal('show');
          this.saveStatus = false;
          this.searchAssignee = false;
        }
      },
      error => {
        this.modalHeading = "Failed";
        this.modalClass = "text-danger";
        this.modalIcon = "times-circle";
        this.modalData = "Error fetching data. Please try again.";
        $("#dataNotFoundModal").modal('show');
      });

  }
  textCheck() {
    if (this.sourceTextArea.nativeElement.value !== "" && this.sourceTextAreaPlanId.nativeElement.value !== "") {
      this.tokenStatus = true;
    } else {
      this.tokenStatus = false;
    }

  }

  getExtractedActionItems() {
    this.isProcessing = true;
    //let text = this.content;
    let token = this.sourceTextArea.nativeElement.value;
    this.accessToke = token;
    this.planId = this.sourceTextAreaPlanId.nativeElement.value;
    this.actionItemExtractionService.getExtractedActionItem(this.content,
      r => {

        r.forEach(item => {
          this.assigneeList.push(item.assignee);
          //this.actionItemsViewModel.push(item);
        });
        this.assigneeList = this.assigneeList.filter((element, i) => i === this.assigneeList.indexOf(element))

        this.actionItemExtractionService.getAssigneeSuggestions(this.assigneeList, token,
          result => {
            if (result.message === "success") {
              this.showActionItem(r, result.assigneeSuggestions);
              this.isProcessing = false;
            } else if (result.message === "token expired") {
              this.modalData = "Token expired. Please try again.";
              $("#assigneeNotFoundModal").modal('show');
              this.isProcessing = false;
            } else {
              this.modalData = "Error fetching data. Please try again.";
              $("#assigneeNotFoundModal").modal('show');
              this.isProcessing = false;
            }

          },
          error => {
            this.modalData = "Error fetching data. Please try again.";
            $("#assigneeNotFoundModal").modal('show');
            this.isProcessing = false;
          });
      },
      e => {
        this.isProcessing = false;
      });
  }
}
