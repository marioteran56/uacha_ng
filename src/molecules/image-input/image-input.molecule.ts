import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'molecule-image-input',
  templateUrl: './image-input.molecule.html',
  styleUrls: ['./image-input.molecule.css']
})
export class ImageInputMolecule implements OnInit {
  @Input('multiple') isMultiple:boolean=false;
  @Input('inputStyle') inputStyle:string='';
  @Input('message') message:string='Subir imagen';
  @Output() onChangeEvent=new EventEmitter();
  // public message!: string;
  title = 'dropzone';
  files: File[] = [];

  constructor() { }

  ngOnInit(): void {
  }


  onSelect(event: any) {
    if(!this.isMultiple){
      this.files=[];
    }

    const formData = new FormData();

    this.files.push(...event.addedFiles);
    for (var i = 0; i < this.files.length; i++) {
      formData.append('file[]', this.files[i]);
    }
    this.onChangeEvent.emit(this.files);
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
    this.onChangeEvent.emit(this.files);
  }
  onRemoveFirstOne() {
    this.files.splice(0, 1);
    this.onChangeEvent.emit(this.files);
  }

  
  customPreview(files: File[]) {
    // console.log("SIUUUU:", file);
    const file=files[0];
    var mimeType = file.type;
    if (mimeType.match('image/*') == null) {
      console.log("Image File not supprted")
      return;
    }
    this.read(file, (url: string | ArrayBuffer | null)=>this.setImgURL(url))
    
    
  }
  read(file:File, callback:any) {
    try{
      var reader = new FileReader();
    
      reader.onload = function() {
        callback(reader.result);
      }
    
      reader.readAsDataURL(file);

    } catch(e){
      throw e;
    }
  }
  setImgURL(url: string | ArrayBuffer | null){
    if(url)
      return url;
      // console.log(this.imgURL)
    return null;
  }
}