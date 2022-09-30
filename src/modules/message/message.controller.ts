import { JwtAuthGuard } from '@app/common/guards/jwt-auth.guard';
import { IRequestWithUserCreds } from '@app/common/types/request.type';
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateMessageDto } from './message.dto';
import { MessageEntity } from './message.entity';
import { MessageService } from './message.service';

@ApiTags('messages')
@ApiBearerAuth()
@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get()
  @ApiOperation({ summary: 'Get all messages' })
  @ApiOkResponse({ status: 200, type: MessageEntity, isArray: true })
  @UseGuards(JwtAuthGuard)
  async getMessages() {
    return await this.messageService.getAllMessages();
  }

  @Post()
  @ApiOperation({ summary: 'Send new message' })
  @ApiCreatedResponse({ status: 200, type: MessageEntity })
  @ApiBody({ type: CreateMessageDto })
  @UseGuards(JwtAuthGuard)
  async sendMessage(
    @Body() createMessageDto: CreateMessageDto,
    @Req() request: IRequestWithUserCreds
  ) {
    return await this.messageService.sendNewMessage(createMessageDto, request.user.id);
  }
}
