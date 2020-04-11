import { User } from '@shared/models/user.model';
import { AkamAgreementStatusEnum } from './akam-agreement-status.enum';
import { Comment } from '@shared/models/comment.model';

export class AkamAgreement {
  comments: Comment[];

  constructor(data?) {
    if (data) {
      this.comments = data.comments;
    }
  }

  get status() {
    return AkamAgreementStatusEnum[this.status];
  }
}
