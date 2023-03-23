import {Param, Query,Body,Headers } from '@nestjs/common';
import { IsEmail, isNumber, IsNumber } from 'class-validator';

export class CreateUserDto {
 
  @IsEmail()
  queryEmail: string;

  @IsNumber()
  bodyNumber: number;
}