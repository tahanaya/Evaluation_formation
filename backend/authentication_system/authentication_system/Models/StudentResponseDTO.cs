﻿
namespace authentication_system.Models;
public class StudentResponseDTO
{
    public Guid Id { get; set; }
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Filiere { get; set; } = string.Empty;



}