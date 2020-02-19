import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag } from '@angular/cdk/drag-drop';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
// import { DatatransferService } from './../datatransfer.service'
// import { Subject } from 'rxjs/Subject';
// import 'rxjs/add/operator/map';


declare var $;
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  files: any = [];
  public imagePath;
  imgURL: any;
  videoURl: any;
  pdfURL: any;
  previewtype = null;

  videotype: any;
  public message: string;
  mainpageform: any





  constructor(private Formbuilder: FormBuilder) {
    this.mainpageform = this.Formbuilder.group({
      "select": [null, Validators.compose([Validators.required])],
      "save": [null, Validators.compose([Validators.required])],
    })
  }


  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.files, event.previousIndex, event.currentIndex);
  }

  ngOnInit() {
    // this.preview()

  }


  fileupload(event) {
    const files = event.target.files;

    if (files) {
      const filejson = {
        name: '',
        type: '',
        url: '',
        delay: '2.5'
      };
      filejson.name = files[0].name;
      var res = files[0].type.split("/");
      filejson.type = res[0];

      const reader = new FileReader();
      reader.onload = (filedata) => {
        filejson.url = reader.result + '';
        this.files.push(filejson);
      };
      reader.readAsDataURL(files[0]);

    }

  }
  preview(filetype, i) {
    this.previewtype = filetype;
    if (filetype == 'image') {
      this.imgURL = this.files[i].url;
    }
    else if (filetype == 'application') {
      this.pdfURL = this.files[i].url;
    }
    else if (filetype == 'video') {
      this.videoURl = this.files[i].url;
    }
  }


  indexvalue: any
  sencondsmodal( index) {
    this.delayerror = ""
    $("#delayval").val("");
    this.indexvalue = index;
    this.previewtype = 'none';
    $("#seconds").modal("show");
  }

  keydowncheck(){
    if ( $("#delayval").val() == '') {
      this.delayerror = "Delay is requred."
    }
    else {
      this.delayerror = ""
    }

  }
  delayerror = ''
  savefile: any;
  save(value) {
    if (value == '') {
      this.delayerror = "Delay is requred."
    }
    else {
      this.files[this.indexvalue].delay = value;
      $("#seconds").modal("hide");
    }
  }

  delete(i: any) {
    const index = this.files.indexOf(i);
    this.files.splice(index, 1);
  }
  page: number = 1;
  totalPages: number;
  isLoaded: boolean = false;
  timerId: any;

  afterLoadComplete(pdfData: any) {
    this.totalPages = pdfData.numPages;
    this.isLoaded = true;
  }
  /**pdf */
  // autorunpdf() {
  //   var root = this;
  //   this.timerId = setInterval(() => {
  //     root.nextPage();

  //   }, 5000);

  // }
  // autoplay(filetype) {
  //   var root = this;
  //   this.timerId = setInterval(() => {
  //     root.preview(filetype);

  //   }, 5000);

  // }


  nextPage() {
    if (this.page == this.totalPages) {
      var root = this;
      clearTimeout(root.timerId);
      return false;
    }
    else {
      this.page++;
    }
  }

  prevPage() {
    this.page--;
  }

  name = 'Angular 6';
  dropdownValue: string;
  disableButtonMode: boolean = false;
  disableButton() {
    console.log(this.dropdownValue);
    if (this.dropdownValue == 'first') {
      this.disableButtonMode = true;
    }
    else {
      this.disableButtonMode = false;
    }
  }

  submitform() {
    if (this.mainpageform.invalid) {
      this.markFormGroupTouched(this.mainpageform);
      // this.getdata.showNotification('bottom', 'right', 'Form is invalid !!', "danger");
      return false;
    } else {
      // this.getdata.showNotification('bottom', 'right', 'Form is valid !!', "success");
      $("#submitform").modal('show')
    }
  }
  confirmsubmitform() {
    $("#submitform").modal('hide')
  }
  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

}

