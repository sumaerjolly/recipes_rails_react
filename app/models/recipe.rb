class Recipe < ApplicationRecord
  validates :name, presence: true
  validates :ingredients, presence: true
  validates :instruction, presence: true
  has_many :favourites, dependent: :destroy
  has_many :users, through: :favourites
end
