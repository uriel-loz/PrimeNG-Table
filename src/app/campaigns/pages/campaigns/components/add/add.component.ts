import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CampaignsService } from '../../../../services/campaigns.service';
import Swal from 'sweetalert2';
import { Campaigns } from '../../../../interfaces/campaings.interface';
import { catchError, delay } from 'rxjs';

@Component({
  selector: 'campaigns-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  public visible: boolean = false;
  private formBuilder = inject(FormBuilder);
  private campaignsService = inject(CampaignsService);

  public myForm: FormGroup = this.formBuilder.group(
    {
      campaign_name: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
    }
  );

  resetForm() {
    this.myForm.reset();
  }

  showDialog() {
    this.visible = true;
  }

  hideDialog() { 
    this.resetForm();
    this.visible = false;
  }

  isValidField(field: string): boolean | null {
    return this.myForm.controls[field].errors
      && this.myForm.controls[field].touched;
  }

  onSubmit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    this.myForm.value.start_date = this.formatDate(this.myForm.value.start_date);
    this.myForm.value.end_date = this.formatDate(this.myForm.value.end_date);

    this.visible = false;

    Swal.fire({
      title: 'Wait',
      text: 'Operation in progress...',
      allowOutsideClick: false,
    });

    Swal.showLoading();

    this.campaignsService.createCampaign(this.myForm.value)
      .pipe(
        catchError(error => {
          Swal.close();
          Swal.fire('Error', error.error.error, 'error');
          return error;
        })
      )
      .subscribe(() => {
        this.hideDialog();
        Swal.close();
        Swal.fire('Success', 'Campaign created successfully', 'success');
      });
  }

  formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  ngOnInit() {
  }

}
