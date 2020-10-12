﻿using DatingApp.API.Helpers;
using DatingApp.API.Models;
using System.Threading.Tasks;

namespace DatingApp.API.Data
{
    public interface IDatingRepository
    {
        public void Add<T>(T entity) where T : class;

        public void Delete<T>(T entity) where T : class;

        public Task<bool> SaveAll();

        public Task<PagedList<User>> GetUsers(UserParams userParams);

        public Task<User> GetUser(int id);

        public Task<Photo> GetPhoto(int id);

        public Task<Photo> GetMainPhotoForUser(int userId);

    }
}
