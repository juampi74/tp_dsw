import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-veh-card',
  standalone: true,
  imports: [],
  templateUrl: './veh-card.component.html',
  styleUrl: './veh-card.component.scss',
})
export class VehicleCardComponent {
  @Input() modelo!: string;
  @Input() descripcion!: string;
  @Input() imagen!: string;
  ImagePath: string;
  constructor() {
    this.ImagePath =
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Tesla_Model_S_%28Facelift_ab_04-2016%29_trimmed.jpg/300px-Tesla_Model_S_%28Facelift_ab_04-2016%29_trimmed.jpg';
  }
}
