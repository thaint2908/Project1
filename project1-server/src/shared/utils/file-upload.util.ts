import {extname} from 'path';
import {v4 as uuidv4} from 'uuid';
import {BadRequestException} from "@nestjs/common";

export const imageFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        return callback(new BadRequestException('Only image files are allowed!'), false);
    }
    callback(null, true);
};

export const editFileName = (req, file, callback) => {
    const name = file.originalname.split('.')[0];
    const fileExtName = extname(file.originalname);
    const randomName = uuidv4();
    callback(null, `${name}-${randomName}${fileExtName}`);
};
