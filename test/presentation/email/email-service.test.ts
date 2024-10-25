import { EmailService, SendMailOptions } from "../../../src/presentation/email/email-service";
import nodemailer from 'nodemailer';

describe('email-service.ts', () => {
    const mockSendMail = jest.fn();
    
    //Mock al creteTransport
    nodemailer.createTransport = jest.fn().mockReturnValue({
        sendMail: mockSendMail
    });

    const emailService = new EmailService();
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should send email', async() => {
        const options: SendMailOptions = {
            to: "fernando.1997.santi@gmail.com",
            subject: "Test",
            htmlBody: "<h1>Test</h1>"
        };

        await emailService.sendEmail(options);
        expect(mockSendMail).toHaveBeenCalledWith({
            attachments: expect.any(Array),
            html: "<h1>Test</h1>",
            subject: "Test",
            to: "fernando.1997.santi@gmail.com"
        });
    });

    test('should send email with attachements', async() => {
        const email = "fernando.1997.santi@gmail.com";
        await emailService.sendEmailWithFileSystemLogs(email);
        expect(mockSendMail).toHaveBeenCalledWith({
            to: email,
            subject: "Logs del servidor",
            html: expect.any(String),
            attachments: expect.arrayContaining([
                { fileName: "logs-all.log", path: "./logs/logs-all.log" },
                { fileName: "logs-high.log", path: "./logs/logs-high.log" },
                { fileName: "logs-medium.log", path: "./logs/logs-medium.log" },
            ])
        });
    });

    test('should return false on error', async () => {
        const options: SendMailOptions = {
          to: "fernando.1997.santi@gmail.com",
          subject: "Test",
          htmlBody: "<h1>Test</h1>"
        };
      
        // Mockear el método sendMail para que lance un error
        mockSendMail.mockImplementation(() => {
          throw new Error('Error de envío de correo');
        });
      
        // Llamar al método sendEmail
        const result = await emailService.sendEmail(options);
      
        // Verificar que el método sendEmail retorne false
        expect(result).toBe(false);
    });
});