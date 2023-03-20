import { Component } from '@angular/core';
import {
  FormBuilder, FormControl, FormGroup, Validators,
} from '@angular/forms';
import { GraphqlService } from './graphql.service';

interface AuthWays {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-graphql',
  templateUrl: './graphql.component.html',
  styleUrls: ['./graphql.component.scss'],
})
export class GraphqlComponent {

  selectedAuth:any;
  graphqlForm!: FormGroup; 
  showSpinner = false;    
  showSuccess = false;
  showFailure = false;
  authWays: AuthWays[] = [
    { value: 'None', viewValue: 'None' },
    { value: 'Basic Authentication', viewValue: 'Basic Authentication' },
    { value: 'Digest Authentication', viewValue: 'Digest Authentication' },
  ];

  constructor(private formBuilder: FormBuilder, private readonly graphqlService: GraphqlService) {
  
  }

  ngOnInit() {
    this.graphqlForm = this.formBuilder.group({
      connectionName: new FormControl('', Validators.required),
      authType: new FormControl('', Validators.required),
      url: new FormControl('', Validators.required)
    })
  }

  submitForm() {
    console.log(this.graphqlForm.value);
  }

  selectionChange(event: any) {
    this.selectedAuth = event.value;
    if (this.selectedAuth === 'Basic Authentication') {
      this.graphqlForm.addControl('userName', new FormControl('', Validators.required));
      this.graphqlForm.addControl('password', new FormControl('', Validators.required))
    }
  }

  testConnection() {
    this.showSpinner = true;
    this.showSuccess = false;
    this.showFailure = false;
    this.graphqlService.checkEndpoint(this.graphqlForm.value.url).subscribe((status: boolean) => {
      console.log(status);
      if(status) {
        this.showSuccess = true;
      } else {
        this.showFailure = true;
      }

      this.showSpinner = false;
    })
  }
}
