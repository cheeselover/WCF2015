class Event < ActiveRecord::Base
  belongs_to :attacker, class_name: "User"
  belongs_to :defender, class_name: "User"
  belongs_to :game
end
