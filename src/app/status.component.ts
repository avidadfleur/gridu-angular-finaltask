import { Component } from '@angular/core';

@Component({
  selector: 'app-status',
  template: `
    <div class="status">
      <h1>404</h1>
      <p>Bad Request</p>
    </div>
  `,
  styles: [
    '.status { margin: 30px auto; }',
    '.status h1 { color: red; font-size: 50px; font-weight: bold; }'
  ]
})
export class StatusComponent {

}
