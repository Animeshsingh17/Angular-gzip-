import { toBase64String } from '@angular/compiler/src/output/source_map';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import icClose from '@iconify/icons-ic/twotone-close';
@Component({
  selector: 'theLunchCircle-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {
  file: File;
  icClose = icClose;
  constructor(@Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<UploadFileComponent>,
    private cd: ChangeDetectorRef) { }
  ngOnInit(): void {
  }
  close(answer) {
  
    var object = {};
    // var reader = new FileReader();
    // reader.readAsDataURL(this.file);
    // reader.onload = function () {
    //   object['base64'] = reader.result;
    // };
    // reader.onerror = function (error) {
    //   console.log('Error: ', error);
    // };
   
    object['type'] = answer;
    object['file'] = this.file;
    this.dialogRef.close(object);
  }
  onFileChanged(event) {
    this.file = event.target.files[0];
  }
}
