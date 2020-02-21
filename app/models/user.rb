class User < ApplicationRecord
	has_secure_password
  validates :username, presence: true
	validates :username, :uniqueness => { case_sensitive: false }
	has_many :favourites, dependent: :destroy
	has_many :recipes, through: :favourites
end
