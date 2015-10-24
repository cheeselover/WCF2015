class User < ActiveRecord::Base
  has_many :participations
  has_many :games, through: :participations

  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i

  validates :email, {
    presence: true,
    format: { with: VALID_EMAIL_REGEX },
    uniqueness: { case_sensitive: false }
  }

  has_secure_password
  validates :password, length: { minimum: 8 }

  has_secure_token :auth_token

  before_save { self.email.downcase! }
end
