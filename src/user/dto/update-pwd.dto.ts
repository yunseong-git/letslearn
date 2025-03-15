import { IsNotEmpty, MinLength, MaxLength, Matches, Validate } from 'class-validator';
import { Match } from '../../common/validators/match.decorator'; // 커스텀 데코레이터 추가

export class UpdatePwdDto {
    @IsNotEmpty({ message: '필수 입력 항목입니다.' })
    @MinLength(10, { message: '비밀번호는 최소 10자리 이상이어야 합니다.' })
    @MaxLength(18, { message: '비밀번호는 18자리 미만이어야 합니다.' })
    @Matches(/^(?=.*[a-z])(?=.*\d)(?=.*[\W_]).+$/, {
        message: '비밀번호는 최소 하나의 소문자, 숫자, 특수문자를 포함해야 합니다.',
    })
    new_password!: string;

    @IsNotEmpty({ message: '필수 입력 항목입니다.' })
    @Validate(Match, ['new_password'], {
        message: '비밀번호 확인이 일치하지 않습니다.',
    })
    check_password!: string;
}