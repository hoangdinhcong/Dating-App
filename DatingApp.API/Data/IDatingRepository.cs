﻿using API.Helpers;
using API.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Data
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

        public Task<Like> GetLike(int userId, int recipientId);

        public Task<Message> GetMessage(int id);

        public Task<PagedList<Message>> GetMessagesForUser(MessageParams messageParams);

        public Task<IEnumerable<Message>> GetMessagesThread(int userId, int recipientId);
    }
}
