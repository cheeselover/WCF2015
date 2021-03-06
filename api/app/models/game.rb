class Game < ActiveRecord::Base
  has_many :participations
  has_many :users, through: :participations
  has_many :events
end
